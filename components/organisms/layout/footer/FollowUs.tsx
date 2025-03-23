import { FooterTwitter } from "@/components/molecules/icons/FooterTwitter";
import { LinkedIcon } from "@/components/molecules/icons/linkedIn";
import Link from "next/link";
import React from "react";

interface SocialItem {
  name: string;
  url: string;
  icon: React.ReactNode;
}

const socialList: SocialItem[] = [
  {
    name: "Twitter",
    url: "http://x.com/si3_ecosystem",
    icon: <FooterTwitter />,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/si3ecosystem/",
    icon: <LinkedIcon />,
  },
];

export const FollowUs = () => {
  return (
    <div className="flex border-gray-400 p-4 lg:justify-center lg:border-r lg:pt-16">
      <div>
        <p className="font-clesmont mb-2 text-2xl font-normal">Follow Us</p>
        <div className="flex flex-col gap-2">
          {socialList.map((social) => (
            <li key={social.name} className="list-none">
              <Link
                href={social.url}
                className="hover:text-primary flex items-center gap-2"
              >
                {social.icon}
                <span>{social.name}</span>
              </Link>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};
