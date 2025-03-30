"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";

import { RootState } from "@/redux/store";

import { Logo } from "@/components/atoms/Logo";
import { Button } from "@/components/atoms/button";
import ProfileMenu from "@/components/molecules/menus/ProfileMenu";

import { NavLinks } from "./navbar/NavLinks";
import { MobileMenu } from "./navbar/MobileMenu";
import { Notification } from "./navbar/Notification";

export function Navbar({ showLinks = true }) {
  const [isScrolled, setIsScrolled] = useState(false);

  const isLoggedIn = useSelector((state: RootState) => state.user.address);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 w-full border-white bg-white shadow-sm transition-all duration-300 outline-none",
        isScrolled ? "border-b border-gray-200" : "border-b border-white",
      )}
      style={{
        backdropFilter: isScrolled ? "blur(12px)" : "none",
        backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.8)" : "white",
      }}
    >
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 py-3 lg:px-24">
        <Link href={"/"}>
          <Logo src="/logo.svg" />
        </Link>

        {showLinks && (
          <div className="ml-32 flex-1 max-lg:hidden">
            <NavLinks />
          </div>
        )}

        <nav className="flex items-center gap-3">
          <Notification />

          <div className="flex items-center gap-3 max-lg:hidden">
            {isLoggedIn ? (
              <ProfileMenu />
            ) : (
              <>
                <Button
                  title="Subscribe"
                  aria-label="Sign Up Button"
                  className="bg-black !py-2"
                  showGradient
                  asChild
                >
                  <Link href={"/onboard"}>Sign Up</Link>
                </Button>

                <Button
                  title="Subscribe"
                  aria-label="Login Button"
                  className="border border-gray-400 bg-white !py-2 text-black"
                >
                  <Link href={"/login"}>Login</Link>
                </Button>
              </>
            )}
          </div>

          <div className="lg:hidden">
            <MobileMenu />
          </div>
        </nav>
      </div>
    </header>
  );
}
