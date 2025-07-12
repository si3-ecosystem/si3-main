"use client";

import { AspectRatio } from "@/components/atoms/aspect-ratio";
import { Card } from "@/components/atoms/card";
import { urlForImage } from "@/lib/sanity/image";
import { Presenter } from "@/types/about";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface ParallaxGalleryProps {
  teamMembers: Presenter[];
}

function TeamMemberCard({
  member,
  index,
}: {
  member: Presenter;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Create individual scroll progress for each card
  const { scrollYProgress: cardScrollProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Smooth parallax transform with different speeds for alternating cards
  const parallaxOffset = index % 2 === 0 ? 100 : -100;
  const y = useTransform(
    cardScrollProgress,
    [0, 1],
    [parallaxOffset, -parallaxOffset],
  );

  // Smooth spring animation for the parallax effect
  const smoothY = useSpring(y, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Opacity animation for entrance
  const opacity = useTransform(
    cardScrollProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0],
  );

  const imageUrl = member.image
    ? urlForImage(member.image)?.src
    : "/about/kara.jpg";

  return (
    <motion.div
      ref={cardRef}
      style={{
        y: smoothY,
        opacity,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <Card className="bg-card/50 overflow-hidden rounded-2xl border-2 px-3 py-4 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg">
        <AspectRatio ratio={9 / 10}>
          <Image
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
            src={imageUrl || "/about/kara.jpg"}
            alt={`${member.name} - ${member.position}`}
            className="h-full w-full rounded-md object-cover transition-transform duration-500 hover:scale-110"
          />
        </AspectRatio>
        <div className="mt-3">
          <h3 className="text-foreground text-lg font-medium">{member.name}</h3>
          <p className="text-primary text-sm font-medium">{member.position}</p>
        </div>
      </Card>
    </motion.div>
  );
}

export function ParallaxGallery({ teamMembers }: ParallaxGalleryProps) {
  return (
    <div className="from-background to-accent relative !z-10 min-h-screen overflow-hidden bg-gradient-to-b py-20">
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
            <TeamMemberCard key={member._id} member={member} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
