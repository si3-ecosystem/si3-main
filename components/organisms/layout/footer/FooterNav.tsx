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
    <div className="flex border-r border-gray-400 p-4 pt-16 lg:justify-center">
      <div>
        <p className="font-clesmont text-2xl font-black">SI Things</p>
        <div className="my-2 flex flex-col gap-2">
          {navItems.map(({ href, label, target }) => (
            <Link
              key={label}
              href={href}
              target={target}
              className="cursor-pointer hover:underline hover:underline-offset-2"
            >
              <button className="block opacity-80">{label}</button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
