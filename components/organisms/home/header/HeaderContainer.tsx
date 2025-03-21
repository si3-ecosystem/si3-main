import React from "react";

import Header from "./Header";
import Partners from "../partners/Partners";
import { HomepageSchema } from "@/types/home";

type Props = {
  HomePageData: HomepageSchema;
};

const HeaderContainer = ({ HomePageData }: Props) => {
  return (
    <div className="relative space-y-16 lg:space-y-36">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 z-0 h-full w-full object-cover object-center"
      >
        <source src={"/videos/connectionformat.mp4"} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Header />
      <Partners data={HomePageData} />
    </div>
  );
};

export default HeaderContainer;
