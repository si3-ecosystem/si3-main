import { Footer } from "@/components/organisms/layout/Footer";
import { Navbar } from "@/components/organisms/layout/Navbar";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
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
      <SmoothScrollProvider>
        <main className="mt-14 h-full w-full flex-1">{children}</main>
      </SmoothScrollProvider>
      <Footer />
    </div>
  );
};

export default MainLayout;
