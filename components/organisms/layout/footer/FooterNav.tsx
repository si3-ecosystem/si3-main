import Link from "next/link";
import React from "react";

export const FooterNav = () => {
  const navItems = [
    { href: "/privacy", label: "Policies" },
    { href: "/diversity-tracker", label: "Diversity Tracker" },
    {
      href: "https://app.charmverse.io/si3/welcome-to-si-3-734090998628107",
      label: "Brand Kit",
      target: "_blank",
    },
    {
      href: "/about",
      label: "About Us",
    },
  ];

  return (
    <div className="flex w-full border-gray-400 p-4 px-0 pb-0 max-lg:border-t lg:justify-center lg:border-r lg:pt-16">
      <div className="max-lg:px-4">
        <p className="font-clesmont mb-2 text-2xl font-normal">SI Things</p>
        <div className="flex flex-col gap-2">
          {navItems.map(({ href, label, target }) => (
            <Link
              key={label}
              href={href}
              target={target}
              className="hover:text-primary cursor-pointer hover:underline hover:underline-offset-2"
            >
              <button className="block opacity-80">{label}</button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
