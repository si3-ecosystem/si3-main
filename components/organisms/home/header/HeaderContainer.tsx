import React from "react";
import Image from "next/image";

import Header from "./Header";
import Partners from "../partners/Partners";

const HeaderContainer = () => {
  return (
    <div className="relative space-y-36">
      <Image
        src="/home/heroBg.png"
        alt=""
        fill
        style={{
          objectFit: "cover",
          objectPosition: "top",
        }}
        className="absolute top-0 left-0 z-0 h-full w-full"
      />

      <Header />
      <Partners />
    </div>
  );
};

export default HeaderContainer;
