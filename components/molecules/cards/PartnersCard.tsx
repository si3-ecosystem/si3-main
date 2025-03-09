import React from "react";
import Image from "next/image";

interface PartnersCardProps {
  src: string;
  alt: string;
  className?: string;
}

const PartnersCard: React.FC<PartnersCardProps> = ({ src, alt, className }) => {
  return (
    <div className="w-72 space-y-2 rounded-2xl border border-gray-100 bg-white p-8">
      <div className="relative h-12">
        <Image
          src={src}
          alt={alt}
          fill
          style={{
            objectFit: "contain",
            objectPosition: "left",
          }}
          className={className}
        />
      </div>

      <p className="text-gray-500">Business Partner</p>
    </div>
  );
};

export default PartnersCard;
