import React from "react";

import PartnersCard from "@/components/molecules/cards/PartnersCard";

interface Partner {
  src: string;
  alt: string;
}

const PartnersList: Partner[] = [
  {
    src: "livepeer.png",
    alt: "Livepeer",
  },
  {
    src: "wa.png",
    alt: "wa",
  },
  {
    src: "wagmi-latam.png",
    alt: "Wagmi Latam",
  },
  {
    src: "web3-ladies.png",
    alt: "web3 Ladies",
  },
];

const CommunityPartner: React.FC = () => {
  return (
    <div className="mx-auto flex max-w-7xl justify-center space-x-8">
      {PartnersList.map((partner, index) => (
        <PartnersCard
          key={index}
          alt={partner.alt}
          src={`/home/partners/community-partner/${partner.src}`}
        />
      ))}
    </div>
  );
};

export default CommunityPartner;
