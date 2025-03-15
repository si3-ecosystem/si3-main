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
        className="text-center text-[28px] leading-10 text-white uppercase max-[410px]:text-[36px] max-sm:tracking-tight lg:text-6xl lg:leading-18"
      >
        Entering <br />
        <HeaderTitle />
        web3 era
      </Title>

      <p className="mx-auto max-w-[336.016px] text-center text-lg text-white lg:max-w-[573.807px] lg:text-xl">
        Uniting Web3 professionals, communities and organizations to <br />
        accelerate growth, together.
      </p>

      <div className="flex justify-center space-x-4 max-lg:mt-[41px]">
        <Button asChild>
          <Link href={"/onboard"}>Get Started</Link>
        </Button>
        <Button
          asChild
          className="bg-white text-black hover:bg-black hover:text-white"
        >
          <Link scroll={true} href={"/about"}>
            Learn More
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
