"use client";

import { AspectRatio } from "@/components/atoms/aspect-ratio";
import { Card } from "@/components/atoms/card";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface TeamMember {
  id: string | number;
  name: string;
  role: string;
  image: string;
}

interface ParallaxGalleryProps {
  teamMembers: TeamMember[];
}

function TeamMemberCard({
  member,
  index,
  scrollYProgress,
}: {
  member: TeamMember;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, index % 2 === 0 ? 100 : -100],
  );

  return (
    <motion.div
      style={{ y }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="bg-card/50 overflow-hidden rounded-2xl border-2 px-3 py-4 backdrop-blur-sm transition-all duration-300 hover:shadow-md">
        <AspectRatio ratio={9 / 10}>
          <Image
            fill
            src={member.image}
            alt={member.name}
            className="h-full w-full rounded-md object-cover transition-transform duration-300"
          />
        </AspectRatio>
        <div className="">
          <h3 className="text-lg font-medium">{member.name}</h3>
          <p className="text-primary text-sm">{member.role}</p>
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
      className="from-background to-accent min-h-screen bg-gradient-to-b py-20"
    >
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

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={member.id}
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
