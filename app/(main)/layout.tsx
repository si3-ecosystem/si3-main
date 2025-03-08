import { Navbar } from "@/components/organisms/layout/Navbar";
import React, { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col justify-between">
      <Navbar />
      <main className="h-full w-full flex-1">{children}</main>
    </div>
  );
};

export default MainLayout;
