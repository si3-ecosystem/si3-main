"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";

import { Logo } from "@/components/atoms/Logo";
import { Button } from "@/components/atoms/button";
import ProfileMenu from "@/components/molecules/menus/ProfileMenu";

import Subscribe from "./navbar/Subscribe";
import { MobileMenu } from "./navbar/MobileMenu";
import { Notification } from "./navbar/Notification";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 w-full border-white bg-white transition-all duration-300 outline-none",
        isScrolled ? "border-b border-gray-200" : "border-b border-white",
      )}
      style={{
        backdropFilter: isScrolled ? "blur(12px)" : "none",
        backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.8)" : "white",
      }}
    >
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 py-4 lg:px-24">
        <Link href={"/"}>
          <Logo src="/logo.svg" />
        </Link>

        <nav className="flex items-center gap-3">
          <Notification />

          <div className="flex items-center gap-3 max-lg:hidden">
            <Subscribe>
              <Button
                title="Subscribe"
                aria-label="Subscribe"
                className="bg-black"
                showGradient
              >
                Subscribe
              </Button>
            </Subscribe>
            <ProfileMenu />
          </div>

          <div className="lg:hidden">
            <MobileMenu />
          </div>
        </nav>
      </div>
    </header>
  );
}
