import { createReservation } from "@/app/actions";
import CategoryShowCase from "@/app/components/CategoryShowCase";
import HomeLocationDetails from "@/app/components/HomeLocationDetails";
import { HomeMap } from "@/app/components/HomeMap";
import { SelectCalendar } from "@/app/components/SelectCalendar";
import { ReservationSubmitButton } from "@/app/components/SubmitButtons";
import { prisma } from "@/app/lib/prisma";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";

async function getData(homeId: string) {
  const data = await prisma.home.findUnique({
    where: {
      id: homeId,
    },
    select: {
      photo: true,
      description: true,
      guests: true,
      bedrooms: true,
      bathrooms: true,
      title: true,
      categoryName: true,
      price: true,
      country: true,
      User: {
        select: {
          profileImage: true,
          firstName: true,
        },
      },
      Reservation: {
        where: {
          homeId,
        },
      },
    },
  });

  return data;
}

export default async function HomeRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getData(id);

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="w-[75%] mx-auto mt-10 mb-12">
      <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>
      <div className="relative h-[550px]">
        <Image
          src={`https://rtbafujqqcveexzbfspn.supabase.co/storage/v1/object/public/images/${data?.photo}`}
          alt="Image of Home"
          fill
          className="rounded-lg h-full object-cover w-full"
        />
      </div>

      <div className="flex justify-between gap-x-24 mt-8">
        <div className="w-2/3">
          <HomeLocationDetails countryName={data?.country as string} />
          <div className="flex gap-x-2 text-muted-foreground">
            <p>{data?.guests} Guests</p> * <p>{data?.bathrooms} Bedrooms</p> *{" "}
            {data?.bathrooms} BathRooms
          </div>
          <div className="flex items-center mt-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                data?.User?.profileImage ??
                "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
              }
              alt="profile image"
              className="w-11 h-11 rounded-full"
            />
            <div className="flex flex-col ml-4">
              <h3 className="font-medium">Hosted by {data?.User?.firstName}</h3>
              <p className="text-sm text-muted-foreground">Host since 2015</p>
            </div>
          </div>
          <Separator className="my-7" />
          <CategoryShowCase categoryName={data?.categoryName as string} />
          <Separator className="my-7" />
          <p className="text-muted-foreground">{data?.description}</p>
          <Separator className="my-7" />
          <HomeMap countryName={data?.country as string} />
        </div>
        <form action={createReservation}>
          <input type="hidden" name="homeId" value={id} />
          <input type="hidden" name="userId" value={user?.id} />
          <SelectCalendar reservation={data?.Reservation} />
          {user ? (
            <ReservationSubmitButton />
          ) : (
            <Button className="w-full">
              <Link href="/api/auth/login">Make a Reservation</Link>
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
