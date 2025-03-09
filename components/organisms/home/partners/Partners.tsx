import React from "react";

import { Title } from "@/components/atoms/title";

import CommunityPartner from "./CommunityPartner";
import EducationPartner from "./EducationPartner";

const Partners = () => {
  return (
    <section className="relative z-10 space-y-20 pb-12">
      <Title className="text-center text-white">Our Partners</Title>

      <div className="space-y-8">
        <CommunityPartner />
        <EducationPartner />
      </div>
    </section>
  );
};

export default Partners;
