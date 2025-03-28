import React from "react";
import Link from "next/link";

import EthermailSubscribe from "@/components/molecules/EthermailSubscribe";

export const FooterSignUp = () => {
  return (
    <div className="flex flex-[2] flex-col items-start space-y-3 border-gray-400 px-4 max-lg:px-4 max-lg:pb-6 lg:border-r lg:py-12">
      <div className="">
        <Link href="/" className="text-5xl font-bold uppercase">
          <span className="font-clesmont text-[40px]">{"SI<3>"}</span>
        </Link>
        <p className="my-3">Stay up-to-date with our CurrentSi newsletter.</p>
      </div>

      <EthermailSubscribe />
    </div>
  );
};
