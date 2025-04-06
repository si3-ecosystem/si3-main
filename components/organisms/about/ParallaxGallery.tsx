"use client";

import { AspectRatio } from "@/components/atoms/aspect-ratio";
import { Card } from "@/components/atoms/card";
import { urlForImage } from "@/lib/sanity/image";
import { Presenter } from "@/types/about";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface ParallaxGalleryProps {
  teamMembers: Presenter[];
}

function TeamMemberCard({
  member,
  index,
  scrollYProgress,
}: {
  member: Presenter;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, index % 2 === 0 ? 200 : -200],
  );

  const imageUrl = member.image
    ? urlForImage(member.image)?.src
    : "/about/kara.jpg";

  console.log("imageUrl", member.image);

  return (
    <motion.div
      style={{ y }}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <Card className="bg-card/50 overflow-hidden rounded-2xl border-2 px-3 py-4 backdrop-blur-sm transition-all duration-300 hover:shadow-md">
        <AspectRatio ratio={9 / 10}>
          <Image
            fill
            loading="lazy"
            decoding="async"
            src={imageUrl || "/about/kara.jpg"}
            alt={member.name}
            className="h-full w-full rounded-md object-cover transition-transform duration-300"
          />
        </AspectRatio>
        <div className="">
          <h3 className="text-lg font-medium">{member.name}</h3>
          <p className="text-primary text-sm">{member.position}</p>
        </div>
      </Card>
    </motion.div>
  );
}

export function ParallaxGallery({ teamMembers }: ParallaxGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div
      ref={containerRef}
      className="from-background to-accent relative !z-10 min-h-screen overflow-hidden bg-gradient-to-b py-20"
    >
      <Image
        src={"/about/abougbackgroundbg.png"}
        fill
        alt="about team section bg"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-6 text-center text-4xl"
        >
          GLOBAL EMERGING TECH <br />
          MINDS & HEARTS
        </motion.h2>
        <motion.p className="mx-auto mb-16 w-full max-w-[690px] text-center text-xl leading-7">
          We are a rapidly-growing ecosystem of teammates, collaborators, and
          co-creators. We prioritize unique value, emerging markets, and
          emotional intelligence as we align with talent from around the world.
        </motion.p>

        <div className="mb-32 grid grid-cols-2 gap-8 lg:mb-32 lg:grid-cols-4 lg:py-20">
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={member._id}
              member={member}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
