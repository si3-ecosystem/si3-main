import React from "react";

import { Title } from "@/components/atoms/title";

import CommunityPartner from "./CommunityPartner";
import EducationPartner from "./EducationPartner";
import { HomepageSchema } from "@/types/home";

type Props = {
  data: HomepageSchema;
};

const Partners = ({ data }: Props) => {
  return (
    <section className="relative z-10 space-y-4 pb-12 md:space-y-12">
      <Title className="text-center text-white">Our Partners</Title>

      <div className="space-y-4 md:space-y-8">
        <CommunityPartner data={data.communityPartners || []} />
        <EducationPartner data={data.educationPartners || []} />
      </div>
    </section>
  );
};

export default Partners;
