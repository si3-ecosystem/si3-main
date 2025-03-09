"use client";

import { ProgrammingCard } from "@/components/molecules/cards/ProgrammingCard";
import { PartialContentCarousel } from "@/components/molecules/carousels/PartialContentCarousel";
import React from "react";

const carouselItems = [
  {
    title: "cryptosmart",
    subtitle: "Building Web3 Reality Ecosystems into Reality",
    imageUrl: "/icons/jpg/videotemp.jpg",
    previewVideoUrl: "/videos/SiUScholars.mp4",
    fullVideoUrl: "/videos/SiUScholars.mp4",
  },
  {
    title: "li:peer",
    subtitle: "The Livepeer Ecosystem",
    imageUrl: "/icons/jpg/videotemp.jpg",

    previewVideoUrl: "/videos/SiUScholars.mp4",
    fullVideoUrl: "/videos/SiUScholars.mp4",
  },
  {
    title: "CONFUSION&JOY",
    subtitle: "Bringing the Light to Darknet and Empowering Creators",
    imageUrl: "/icons/jpg/videotemp.jpg",

    previewVideoUrl: "/videos/SiUScholars.mp4",
    fullVideoUrl: "/videos/SiUScholars.mp4",
  },
  {
    title: "METIS",
    subtitle: "How to Build A Successful Team",
    imageUrl: "/icons/jpg/videotemp.jpg",

    previewVideoUrl: "/videos/SiUScholars.mp4",
    fullVideoUrl: "/videos/SiUScholars.mp4",
  },
  {
    title: "Web3 Ladies",
    subtitle: "Navigating the Web3 Developer Landscape",
    imageUrl: "/icons/jpg/videotemp.jpg",

    previewVideoUrl: "/videos/SiUScholars.mp4",
    fullVideoUrl: "/videos/SiUScholars.mp4",
  },
  {
    title: "MOJITO",
    subtitle:
      "How Brands Can Leverage Web3 to Create Deeper Connections With Their Customers",
    imageUrl: "/icons/jpg/videotemp.jpg",

    previewVideoUrl: "/videos/SiUScholars.mp4",
    fullVideoUrl: "/videos/SiUScholars.mp4",
  },
  {
    title: "li:peer",
    subtitle: "The Livepeer Ecosystem",
    imageUrl: "/icons/jpg/videotemp.jpg",

    previewVideoUrl: "/videos/SiUScholars.mp4",
    fullVideoUrl: "/videos/SiUScholars.mp4",
  },
  {
    title: "CONFUSION&JOY",
    subtitle: "Bringing the Light to Darknet and Empowering Creators",
    imageUrl: "/icons/jpg/videotemp.jpg",

    previewVideoUrl: "/videos/SiUScholars.mp4",
    fullVideoUrl: "/videos/SiUScholars.mp4",
  },
  {
    title: "METIS",
    subtitle: "How to Build A Successful Team",
    imageUrl: "/icons/jpg/videotemp.jpg",

    previewVideoUrl: "/videos/SiUScholars.mp4",
    fullVideoUrl: "/videos/SiUScholars.mp4",
  },
  {
    title: "Web3 Ladies",
    subtitle: "Navigating the Web3 Developer Landscape",
    imageUrl: "/icons/jpg/videotemp.jpg",

    previewVideoUrl: "/videos/SiUScholars.mp4",
    fullVideoUrl: "/videos/SiUScholars.mp4",
  },
  {
    title: "MOJITO",
    subtitle:
      "How Brands Can Leverage Web3 to Create Deeper Connections With Their Customers",
    imageUrl: "/icons/jpg/videotemp.jpg",

    previewVideoUrl: "/videos/SiUScholars.mp4",
    fullVideoUrl: "/videos/SiUScholars.mp4",
  },
];

export function Programming() {
  return (
    <div className="w-full py-14 lg:py-20">
      <PartialContentCarousel
        title="Si Her Programming"
        description="Advanced emerging tech & professional development workshops focused on accelerating leadership and collaboration."
        items={carouselItems}
        renderItem={(_, key) => <ProgrammingCard key={key} />}
        className="pr-4 lg:pr-[90px]"
      />
    </div>
  );
}
