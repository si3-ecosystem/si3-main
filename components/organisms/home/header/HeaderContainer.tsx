import React from "react";
import Image from "next/image";

import Header from "./Header";
import Partners from "../partners/Partners";
import { HomepageSchema } from "@/types/home";
import { urlForImage } from "@/lib/sanity/image";

type Props = {
  HomePageData: HomepageSchema;
};

const HeaderContainer = ({ HomePageData }: Props) => {
  const imageUrl = HomePageData.image
    ? urlForImage(HomePageData.image)?.src
    : "/home/heroBg.png";
  return (
    <div className="relative space-y-16 lg:space-y-36">
      <Image
        src={imageUrl || "/home/heroBg.png"}
        alt="HomePage bg"
        priority
        {...(HomePageData.image?.blurDataURL && {
          placeholder: "blur",
          blurDataURL: HomePageData.image?.blurDataURL,
        })}
        fill
        style={{
          objectFit: "cover",
          objectPosition: "top",
        }}
        className="absolute top-0 left-0 z-0 h-full w-full max-md:hidden"
      />
      <Image
        src={"/home/homebgmobile.png"}
        alt="HomePage bg"
        priority
        {...(HomePageData.image?.blurDataURL && {
          placeholder: "blur",
          blurDataURL: HomePageData.image?.blurDataURL,
        })}
        fill
        style={{
          objectFit: "cover",
          objectPosition: "top",
        }}
        className="absolute top-0 left-0 z-0 h-full w-full md:hidden"
      />
      <Header />
      <Partners data={HomePageData} />
    </div>
  );
};

export default HeaderContainer;
