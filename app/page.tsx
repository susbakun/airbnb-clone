import { Suspense } from "react";
import { ListingCard } from "./components/ListingCard";
import { MapFilterItems } from "./components/MapFilterItems";
import { prisma } from "./lib/prisma";
import SkeletonCard from "./components/SkeletonCard";
import NoItem from "./components/NoItem";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";

async function getData({
  searchParams,
  userId,
}: {
  userId: string | undefined;
  searchParams?: {
    filter?: string;
    country?: string;
    guests?: string;
    room?: string;
    bathroom?: string;
  };
}) {
  noStore();
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedLocation: true,
      addedDescription: true,
      categoryName: searchParams?.filter ?? undefined,
      country: searchParams?.country ?? undefined,
      guests: searchParams?.guests ?? undefined,
      bedrooms: searchParams?.room ?? undefined,
      bathrooms: searchParams?.bathroom ?? undefined,
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      country: true,
      Favorite: {
        where: {
          userId: userId ?? undefined,
        },
      },
    },
  });

  return data;
}

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{
    filter?: string;
    country?: string;
    guests?: string;
    room?: string;
    bathroom?: string;
  }>;
}) {
  const sp = await searchParams;
  return (
    <div className="container mx-auto px-5 lg:px-10 mb-12">
      <MapFilterItems />

      <Suspense key={sp?.filter} fallback={<SkeletonLoading />}>
        <ShowItems searchParams={sp} />
      </Suspense>
    </div>
  );
}

async function ShowItems({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
    country?: string;
    guests?: string;
    room?: string;
    bathroom?: string;
  };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData({ searchParams, userId: user?.id });

  return (
    <>
      {data.length > 0 ? (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {data.map((item) => (
            <ListingCard
              description={item.description as string}
              imagePath={item.photo as string}
              price={item.price as number}
              location={item.country as string}
              userId={user?.id}
              key={item.id}
              favoriteId={item.Favorite[0]?.id}
              isInFavoriteList={item.Favorite.length > 0}
              homeId={item.id}
              pathName="/"
            />
          ))}
        </div>
      ) : (
        <NoItem
          description="Please check another category or create your own listing"
          title="Sorry no listings found for this category..."
        />
      )}
    </>
  );
}

function SkeletonLoading() {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
