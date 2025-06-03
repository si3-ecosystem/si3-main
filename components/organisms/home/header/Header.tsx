import React from "react";

import { Title } from "@/components/atoms/title";
import { Button } from "@/components/atoms/button";
import { HeaderTitle } from "./HeaderTitle";
import { HomepageSchema } from "@/types/home";
import Link from "next/link";

const Header = ({ data }: { data: HomepageSchema }) => {
  return (
    <div className="relative z-10 space-y-4 pt-[112px] lg:pt-[180px]">
      <Title
        as="h1"
        variant="huge"
        className="text-center text-[32px] leading-10 text-white uppercase max-sm:tracking-tight sm:text-[36px] lg:text-6xl lg:leading-18"
      >
        Entering <br />
        <HeaderTitle />
        web3 era
      </Title>

      <p className="mx-auto max-w-[336.016px] text-center text-base font-normal text-white lg:max-w-[543.807px] lg:text-xl">
        {data.desc}
      </p>
      <h3 className="text-center text-[11px] leading-7 font-semibold tracking-[1.5px] text-white md:hidden md:text-xl">
        Powered by <span>{"SI<3>"}</span>
      </h3>

      <div className="layout mt-[68px] flex w-full items-center justify-center py-0 max-lg:px-5 md:items-end md:justify-between">
        <div className="flex flex-col gap-4">
          <h3 className="text-[25px] leading-9 font-semibold tracking-[2.75px] text-white max-md:hidden">
            Web3 Access For All
          </h3>
          <div className="flex items-center gap-5">
            {data.ctaText && (
              <Button asChild>
                <Link href={data.ctaLink}>{data.ctaText}</Link>
              </Button>
            )}
            {data.ctaText2 && (
              <Button asChild className="bg-[#3C1FEF]">
                <Link href={data.ctaLink2}>{data.ctaText2}</Link>
              </Button>
            )}
          </div>
        </div>
        <div>
          <h3 className="text[11px] leading-7 font-semibold tracking-[1.5px] text-white max-md:hidden md:text-xl">
            Powered by <span>{"SI<3>"}</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Header;
