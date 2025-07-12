"use client";

import Link from "next/link";
import React from "react";
import { trackEvent } from "@/utils/trackEvent";

export const FooterNav = ({ mediakit }: { mediakit: string }) => {
  const navItems = [
    { href: "/policy/privacy", label: "Policies" },
    {
      href:
        mediakit ||
        "https://coda.io/d/SI-3-Coda-Hub_daevZXQYrvh/SI-3-Brand-Kit_sui7d299?notification_link_uid=bko3UlA4dHMrRUNERGw5REY0UldzaENjUVFlaFg1WldLNUQyTXNQNm9QQThUMWVranJhS3VIb2RLUy9aUjMxdURDUEQyenNNRG8vTHdaeHBIcTh2T3NOVGIzM1V0N3BlTUZLUjNDM053UTVPNC94RTFqZWhnZVdud3dMOGxpWGs3S2NFL1BnTnEwb1JDZDVNcE9VMXhnPT0tLWo4UTNJclRERDBXbkZCNVFnMW5qN0E9PQ%3D%3D--b0e3af3daf6ad6a1a931324c579a3ca92c6ad0a3",
      label: "Brand Kit",
      target: "_blank",
    },
    {
      href: "/mission",
      label: "Mission",
    },
  ];

  return (
    <div className="flex w-full border-gray-400 p-4 px-0 pb-0 max-lg:border-t lg:w-fit lg:justify-center lg:border-r lg:pt-16">
      <div className="max-lg:px-4 lg:px-24">
        <p className="font-clesmont mb-2 text-2xl font-normal">SI Things</p>

        <div className="flex flex-col gap-2">
          {navItems.map(({ href, label, target }) => (
            <Link
              key={label}
              href={href}
              target={target}
              className="hover:text-primary block w-fit cursor-pointer opacity-80 hover:underline hover:underline-offset-2"
              onClick={() => trackEvent("SI Things Clicked", { label })}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
