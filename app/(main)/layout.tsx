import { Navbar } from "@/components/organisms/layout/Navbar";
import React, { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col justify-between">
      <Navbar />
      <main className="h-full w-full flex-1 pt-16">{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
