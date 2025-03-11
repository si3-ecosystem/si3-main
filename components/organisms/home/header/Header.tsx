import React from "react";

import { Title } from "@/components/atoms/title";
import { Button } from "@/components/atoms/button";

const Header = () => {
  return (
    <header className="relative z-10 space-y-4 pt-32 lg:space-y-8">
      <Title
        as="h1"
        variant="huge"
        className="text-center text-[40px] leading-10 text-white uppercase lg:text-6xl lg:leading-18"
      >
        Entering <br />
        <span className="bg-gradient-to-r from-[#CE9FFC] to-[#BFB8FF] bg-clip-text text-transparent">
          a collaborative
        </span>
        <br /> web3 era
      </Title>

      <p className="mx-auto max-w-[336.016px] text-center text-lg text-white lg:max-w-[573.807px] lg:text-xl">
        Uniting Web3 professionals, communities and organizations to <br />
        accelerate growth, together.
      </p>

      <div className="flex justify-center space-x-4 max-lg:mt-[41px]">
        <Button>Get Started</Button>
        <Button showGradient>Learn More</Button>
      </div>
    </header>
  );
};

export default Header;
