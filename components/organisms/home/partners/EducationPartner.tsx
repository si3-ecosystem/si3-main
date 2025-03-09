import React from "react";

import PartnersCard from "@/components/molecules/cards/PartnersCard";

interface Partner {
  src: string;
  alt: string;
}

const PartnersList: Partner[] = [
  {
    src: "crypto-female.png",
    alt: "Crypto Female",
  },
  {
    src: "woman-blockchain.png",
    alt: "Woman Blockchain Talks",
  },
  {
    src: "filipinas-nft.png",
    alt: "Filipinas NFT",
  },
  {
    src: "systain3r.png",
    alt: "Systain3r",
  },
];

const EducationPartner: React.FC = () => {
  return (
    <div className="mx-auto flex justify-center space-x-8">
      {PartnersList.map((partner, index) => (
        <PartnersCard
          key={index}
          alt={partner.alt}
          src={`/home/partners/education-partner/${partner.src}`}
        />
      ))}
    </div>
  );
};

export default EducationPartner;
