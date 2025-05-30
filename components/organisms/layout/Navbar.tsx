import { Button } from "@/components/atoms/button";
import { NavLinks } from "./navbar/NavLinks";
import { TokenValue } from "./navbar/TokenValue";
import { MobileMenu } from "./navbar/MobileMenu";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="layout absolute top-0 right-0 left-0 z-50">
      <div className="flex w-full items-center justify-between px-3.5 py-2 xl:px-6 xl:py-5">
        <MobileMenu />
        <TokenValue />
        <NavLinks />
        <Button asChild className="nav-gradient bg-black">
          <Link href="/login">SI U ONBOARD</Link>
        </Button>
      </div>
    </header>
  );
}
