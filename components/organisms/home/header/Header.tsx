import React from "react";

import { Title } from "@/components/atoms/title";
import { Button } from "@/components/atoms/button";
import Link from "next/link";
import { HeaderTitle } from "./HeaderTitle";

const Header = () => {
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

      <p className="mx-auto max-w-[336.016px] text-center text-lg font-normal text-white lg:max-w-[543.807px] lg:text-xl">
        Uniting Web3 professionals, communities and organizations to accelerate
        growth, together.
      </p>

      <div className="flex justify-center space-x-4 max-lg:mt-[41px]">
        <Button asChild className="!h-14">
          <Link href={"/onboard"} className="font-medium">
            Get Started
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
