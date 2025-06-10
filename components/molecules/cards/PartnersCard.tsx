"use client";

import React from "react";
import Image from "next/image";

interface PartnersCardProps {
  src: string;
  alt: string;
  className?: string;
  type?: string;
}

const PartnersCard: React.FC<PartnersCardProps> = ({ src, alt }) => {
  return (
    <div className="h-8 md:h-12">
      <Image
        src={src}
        alt={alt}
        width={400}
        height={140}
        className={"w-[140px]"}
      />
    </div>
  );
};

export default PartnersCard;
