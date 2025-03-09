import { Navbar } from "@/components/organisms/layout/Navbar";
import React, { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col justify-between overflow-x-hidden">
      <Navbar />
      <main className="h-full w-full">{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
