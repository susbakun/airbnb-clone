"use client";

import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { useCountries } from "../lib/getCountries";

export function HomeMap({ countryName }: { countryName: string }) {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(countryName as string);

  const LazyMap = dynamic(() => import("@/app/components/Map"), {
    ssr: false,
    loading: () => <Skeleton className="h-[50vh] w-full" />,
  });

  return <LazyMap locationValue={country?.value as string} />;
}
