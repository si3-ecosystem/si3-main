import React from "react";

import { Title } from "@/components/atoms/title";
import { Button } from "@/components/atoms/button";

const Header = () => {
  return (
    <header className="relative z-10 space-y-8 pt-32">
      <Title
        as="h1"
        variant="huge"
        className="text-center text-6xl leading-18 font-bold text-white uppercase"
      >
        Entering <br />
        <span className="bg-gradient-to-r from-[#CE9FFC] to-[#BFB8FF] bg-clip-text text-transparent">
          a collaborative
        </span>
        <br /> web3 era
      </Title>

      <p className="text-center text-xl text-white">
        Uniting Web3 professionals, communities and organizations to <br />
        accelerate growth, together.
      </p>

      <div className="flex justify-center space-x-4">
        <Button>Get Started</Button>
        <Button showGradient>Learn More</Button>
      </div>
    </header>
  );
};

export default Header;
