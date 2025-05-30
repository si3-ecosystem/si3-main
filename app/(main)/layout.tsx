import { Footer } from "@/components/organisms/layout/Footer";
import { Navbar } from "@/components/organisms/layout/Navbar";
import { processMetadata } from "@/utils/sharedMetadata";
import React, { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}
export async function generateMetadata() {
  return await processMetadata();
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col justify-between overflow-x-hidden">
      <Navbar />
      <main className="h-full w-full flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
