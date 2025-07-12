"use client";

import { useQuery } from "@tanstack/react-query";
import { getDiversityTrackerData } from "@/lib/sanity/client";
import { DiversityTracker } from "@/types/diversity-tracker";
import { Loader } from "@/components/atoms/Loader";
import { TrackerPage } from "@/components/organisms/web3-tracker/TrackerPage";

const Web3HealthTrackerPage = () => {
  const { data, isLoading } = useQuery<DiversityTracker>({
    queryKey: ["getDiversityTracker"],
    queryFn: getDiversityTrackerData,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loader />;

  return <TrackerPage trackerData={data} />;
};

export default Web3HealthTrackerPage;
