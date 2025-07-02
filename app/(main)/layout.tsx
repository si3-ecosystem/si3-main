import { Grow3dgePopupCard } from "@/components/molecules/cards/Grow3dgePopupCard";
import { Footer } from "@/components/organisms/layout/Footer";
import { Navbar } from "@/components/organisms/layout/Navbar";
import { getSeoData } from "@/lib/sanity/client";
import { processMetadata } from "@/utils/sharedMetadata";
import React, { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}
export async function generateMetadata() {
  return await processMetadata();
}

const MainLayout = async ({ children }: MainLayoutProps) => {
  const utils = await getSeoData();
  return (
    <div className="flex flex-col justify-between overflow-x-hidden">
      <Navbar />
      <main className="h-full w-full flex-1">{children}</main>
      <Grow3dgePopupCard />
      <Footer utils={utils} />
    </div>
  );
};

export default MainLayout;
