import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import DesktopLogo from "@/public/airbnb-desktop.png";
import MobileLogo from "@/public/airbnb-mobile.webp";
import UserNav from "./UserNav";
import { SearchModalComponent } from "./SearchComponent";

function Navbar() {
  return (
    <nav className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
      <Link href="/">
        <Image
          src={DesktopLogo}
          alt="desktop logo"
          className="w-32 hidden lg:block"
        />
        <Image
          src={MobileLogo}
          alt="mobile logo"
          className="block lg:hidden w-12"
        />
      </Link>
      <Suspense
        fallback={
          <div className="rounded-full py-2 px-5 border flex items-center">
            <div className="flex h-full divide-x font-medium">
              <p className="px-4">Anywhere</p>
              <p className="px-4">Any week</p>
              <p className="px-4">Any Guests</p>
            </div>
          </div>
        }
      >
        <SearchModalComponent />
      </Suspense>
      <UserNav />
    </nav>
  );
}
export default Navbar;
