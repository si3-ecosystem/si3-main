import Image from "next/image";
import Link from "next/link";
import React from "react";

// Style it

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

const FollowUs = () => {
  return (
    <div>
      <h2>Follow Us</h2>

      <ul>
        {socialList.map((social) => (
          <li key={social.name}>
            <Link href={social.url}>
              <Image src={social.icon} alt={social.name} />

              {social.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowUs;
