"use client";

import React from "react";
import { useCountries } from "../lib/getCountries";

function HomeLocationDetails({ countryName }: { countryName: string }) {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(countryName as string);

  return (
    <h3 className="text-xl font-medium">
      {country?.flag} {country?.label} / {country?.region}
    </h3>
  );
}

export default HomeLocationDetails;
