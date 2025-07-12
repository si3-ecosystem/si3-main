import React from "react";

import { Title } from "@/components/atoms/title";
// import { Button } from "@/components/atoms/button";
import { HeaderTitle } from "./HeaderTitle";
import { HomepageSchema } from "@/types/home";
import { Button } from "@/components/atoms/button";
import Link from "next/link";
// import Link from "next/link";

const Header = ({ data }: { data: HomepageSchema }) => {
  return (
    <div className="relative z-10 space-y-4 pt-[112px] lg:pt-[240px]">
      <Title
        as="h1"
        variant="huge"
        className="text-center text-[32px] leading-10 text-white uppercase max-sm:tracking-tight sm:text-[36px] lg:text-6xl lg:leading-18"
      >
        Entering <br />
        <HeaderTitle />
        web3 era
      </Title>

      <p className="mx-auto max-w-[336.016px] text-center text-base font-normal text-white lg:max-w-[380px] lg:text-xl">
        {data.desc}
      </p>
      <h3 className="text-center text-[11px] leading-7 font-semibold tracking-[1.5px] text-white max-md:hidden md:hidden md:text-xl">
        Powered by <span>{"SI<3>"}</span>
      </h3>

      <div className="layout mt-[81px] flex items-center justify-center">
        <Button asChild className="bg-[#9F44D3]">
          <Link href={"/#si-u"}>Explore SI U </Link>
        </Button>
      </div>
    </div>
  );
};

export default Header;
