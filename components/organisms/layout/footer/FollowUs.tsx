import Image from "next/image";
import Link from "next/link";
import React from "react";

interface SocialItem {
  name: string;
  url: string;
  icon: string;
}

const socialList: SocialItem[] = [
  {
    name: "Twitter",
    url: "https://twitter.com",
    icon: "/social/twitter.svg",
  },
  {
    name: "Facebook",
    url: "https://facebook.com",
    icon: "/social/facebook.svg",
  },
];

export const FollowUs = () => {
  return (
    <div className="flex border-r border-gray-400 p-4 lg:justify-center lg:pt-16">
      <div>
        <p className="font-clesmont text-2xl font-black">Follow Us</p>
        <div className="my-2 flex flex-col gap-2">
          {socialList.map((social) => (
            <li key={social.name}>
              <Link href={social.url}>
                <Image
                  src={social.icon}
                  alt={social.name}
                  width={26}
                  height={26}
                  className="size-6 h-6 w-6"
                />

                {social.name}
              </Link>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};
