"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export function AnimatedHands() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    amount: 0.3,
  });

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isInView) setAnimate(true);
  }, [isInView]);

  const upVariants = {
    hidden: { y: 0, opacity: 0.8 },
    visible: {
      y: -250,
      opacity: 1,
      transition: { duration: 1.2, ease: "easeInOut", delay: 0.2 },
    },
  };

  const downVariants = {
    hidden: { y: 0, opacity: 0.8 },
    visible: {
      y: 250,
      opacity: 1,
      transition: { duration: 1.2, ease: "easeInOut", delay: 0.2 },
    },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={animate ? "visible" : "hidden"}
      className="flex h-[40vh] items-center justify-between gap-6 sm:h-[70vh]"
    >
      {/* Left Hand - Moves Up */}
      <motion.div
        className="flex h-full w-full items-end justify-start"
        variants={upVariants}
      >
        <Image
          src="/about/hands/left_hand.jpg"
          alt="left hand"
          width={800}
          height={800}
          loading="lazy"
          decoding="async"
          className="h-full max-h-[180.577px] w-full max-w-[180.577px] object-contain object-left sm:max-h-[392.348px] sm:max-w-[448.255px]"
        />
      </motion.div>

      {/* Center Logo - Stays Still */}
      <div className="flex h-full w-full items-center justify-center">
        <Image
          src="/about/hands/centerlogo.jpg"
          alt="center logo"
          width={800}
          height={800}
          loading="lazy"
          decoding="async"
          className="h-full max-h-[141.273px] w-full max-w-[141.273px] object-contain sm:object-cover lg:max-h-[261px] lg:max-w-[261px]"
        />
      </div>

      {/* Right Hand - Moves Down */}
      <motion.div
        className="flex h-full w-full items-start justify-end max-sm:-mt-32"
        variants={downVariants}
      >
        <Image
          src="/about/hands/right_hand.jpg"
          alt="right hand"
          width={800}
          height={800}
          loading="lazy"
          decoding="async"
          className="-mr-9 h-full max-h-[205.632px] w-full max-w-[213.522px] object-contain object-right sm:max-h-[392.348px] sm:max-w-[448.255px]"
        />
      </motion.div>
    </motion.section>
  );
}
