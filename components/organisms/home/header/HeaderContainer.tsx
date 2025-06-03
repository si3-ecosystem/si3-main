import React from "react";

import Header from "./Header";
import { HomepageSchema } from "@/types/home";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";

type Props = {
  HomePageData: HomepageSchema;
};

const HeaderContainer = ({ HomePageData }: Props) => {
  const imageUrl = HomePageData.image && urlForImage(HomePageData.image)?.src;
  return (
    <div className="relative min-h-[55vh] space-y-16 pb-[52px] md:pb-[88px] lg:space-y-28">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={HomePageData.title}
          fill
          className="h-full w-full object-cover object-center"
        />
      )}
      <Header data={HomePageData} />
    </div>
  );
};

export default HeaderContainer;
