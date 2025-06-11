"use client";

// import { Button } from "@/components/atoms/button";
import { NavLinks } from "./navbar/NavLinks";
// import { TokenValue } from "./navbar/TokenValue";
import { MobileMenu } from "./navbar/MobileMenu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/atoms/Logo";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathName = usePathname();

  if (pathName === "/onboard") {
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
            <Link href="/onboard">SI U ONBOARD</Link>
          </Button> */}
        </div>
      </header>
    );
  }

  if (pathName === "/mission") {
    return (
      <header className="layout absolute top-0 right-0 left-0 z-50">
        <div className="flex w-full items-center justify-between px-3.5 py-2 xl:px-6 xl:py-5">
          <div className="flex items-center gap-3">
            <MobileMenu />

            <Link href={"/"}>
              <Logo src="/logo.svg" alt="SI3 Logo" className="invert" />
            </Link>
          </div>

          {/* <Button asChild className="nav-gradient bg-black">
            <Link href="/onboard">SI U ONBOARD</Link>
          </Button> */}
        </div>
      </header>
    );
  }
  return (
    <header className="layout absolute top-0 right-0 left-0 z-50">
      <div
        className={cn(
          "flex w-full items-center justify-between px-3.5 py-2 xl:px-6",
          pathName === "/" ? "xl:py-5" : "py-2",
        )}
      >
        <div className="flex items-center gap-3">
          <MobileMenu />

          <Link href={"/"} className="max-md:hidden">
            <Logo
              src="/logo.svg"
              alt="SI3 Logo"
              className={cn(pathName === "/" ? "invert" : "")}
            />
          </Link>
        </div>
        {/* <TokenValue /> */}
        <NavLinks />
        <div></div>
        {/* <Button asChild className="nav-gradient bg-black">
          <Link href="/onboard">SI U ONBOARD</Link>
        </Button> */}
      </div>
    </header>
  );
}
