import { prisma } from "@/app/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

export async function GET() {
  noStore();
  const user = await currentUser();

  if (!user || user == null || !user.id)
    throw new Error("Something went wrong");

  let dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        email: user.emailAddresses[0]?.emailAddress ?? "",
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        id: user.id,
        profileImage:
          user.imageUrl ?? `https://avatar.vercel.sh/${user.firstName}`,
      },
    });
  }

  return NextResponse.redirect("https://airbnb-clone-cxfn.vercel.app/");
}
