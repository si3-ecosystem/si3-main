"use client";

import { CollabCard } from "@/components/molecules/cards/collabCard";
import { VideoCarousel } from "@/components/molecules/carousels/videoCarousel";
const carouselItemsV2 = [
  {
    title: "cryptosmart",
    subtitle: "Building Web3 Reality Ecosystems into Reality",
    imageUrl: "https://example.com/images/cryptosmart.jpg",
    videoUrl: "https://example.com/videos/cryptosmart.mp4",
  },
  {
    title: "li:peer",
    subtitle: "The Livepeer Ecosystem",
    imageUrl: "https://example.com/images/livepeer.jpg",
    videoUrl: "https://example.com/videos/livepeer.mp4",
  },
  {
    title: "CONFUSION&JOY",
    subtitle: "Bringing the Light to Darknet and Empowering Creators",
    imageUrl: "https://example.com/images/confusionjoy.jpg",
    videoUrl: "https://example.com/videos/confusionjoy.mp4",
  },
  {
    title: "cryptosmart",
    subtitle: "Building Web3 Reality Ecosystems into Reality",
    imageUrl: "https://example.com/images/cryptosmart.jpg",
    videoUrl: "https://example.com/videos/cryptosmart.mp4",
  },
  {
    title: "li:peer",
    subtitle: "The Livepeer Ecosystem",
    imageUrl: "https://example.com/images/livepeer.jpg",
    videoUrl: "https://example.com/videos/livepeer.mp4",
  },
  {
    title: "CONFUSION&JOY",
    subtitle: "Bringing the Light to Darknet and Empowering Creators",
    imageUrl: "https://example.com/images/confusionjoy.jpg",
    videoUrl: "https://example.com/videos/confusionjoy.mp4",
  },
];
export function SiHerKollab() {
  return (
    <div className="py-14 lg:py-20">
      <VideoCarousel
        title="Si Her Kollab"
        description="Explore our growing collaborative of women & non-binary led Web3 communities."
        itemsPerSlide={3}
        items={carouselItemsV2}
        renderItem={() => <CollabCard />}
      />
    </div>
  );
}
