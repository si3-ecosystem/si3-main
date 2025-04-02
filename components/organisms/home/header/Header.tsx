import React from "react";

import { Title } from "@/components/atoms/title";
import { Button } from "@/components/atoms/button";
import Link from "next/link";
import { HeaderTitle } from "./HeaderTitle";
import { HomepageSchema } from "@/types/home";

const Header = ({ data }: { data: HomepageSchema }) => {
  return (
    <header className="relative z-10 space-y-4 pt-32 lg:space-y-8">
      <Title
        as="h1"
        variant="huge"
        className="text-center text-[32px] leading-10 text-white uppercase max-sm:tracking-tight sm:text-[36px] lg:text-6xl lg:leading-18"
      >
        Entering <br />
        <HeaderTitle />
        web3 era
      </Title>

      <p className="mx-auto -mt-4 max-w-[336.016px] text-center text-lg font-normal text-white lg:max-w-[543.807px] lg:text-xl">
        {data.desc}
      </p>

      <div className="flex justify-center space-x-4 max-lg:mt-[41px]">
        <Button asChild className="!h-14 py-[18px] text-base">
          <Link href={data.ctaLink || "/onboard"} className="font-medium">
            {data.ctaText}
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
