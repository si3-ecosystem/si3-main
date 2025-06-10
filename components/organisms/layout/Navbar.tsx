"use client";

// import { Button } from "@/components/atoms/button";
import { NavLinks } from "./navbar/NavLinks";
// import { TokenValue } from "./navbar/TokenValue";
import { MobileMenu } from "./navbar/MobileMenu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/atoms/Logo";

export function Navbar() {
  const pathName = usePathname();

  if (pathName !== "/") {
    return (
      <header className="layout absolute top-0 right-0 left-0 z-50">
        <div className="flex w-full items-center justify-between px-3.5 py-2 xl:px-6 xl:py-5">
          <div className="flex items-center gap-3">
            <MobileMenu />

            <Link href={"/"}>
              <Logo src="/logo.svg" alt="SI3 Logo" />
            </Link>
          </div>

          {/* <Button asChild className="nav-gradient bg-black">
            <Link href="/login">SI U ONBOARD</Link>
          </Button> */}
        </div>
      </header>
    );
  }

  return (
    <header className="layout absolute top-0 right-0 left-0 z-50">
      <div className="flex w-full items-center justify-between px-3.5 py-2 xl:px-6 xl:py-5">
        <div className="flex items-center gap-3">
          <MobileMenu />

          <Link href={"/"}>
            <Logo src="/logo.svg" alt="SI3 Logo" className="invert" />
          </Link>
        </div>
        {/* <TokenValue /> */}
        <NavLinks />
        <div></div>
        {/* <Button asChild className="nav-gradient bg-black">
          <Link href="/login">SI U ONBOARD</Link>
        </Button> */}
      </div>
    </header>
  );
}
