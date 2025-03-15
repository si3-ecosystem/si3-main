"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function HeaderTitle() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const words = [
    { text: "An Accessible", gradient: "from-[#F6CEEC] to-[#D939CD]" },
    { text: "A Collaborative", gradient: "from-[#CE9FFC] to-[#7367F0]" },
    { text: "A Diverse", gradient: "from-[#ABDCFF] to-[#0396FF]" },
    { text: "An Invincible", gradient: "from-[#FFF6B7] to-[#F6416C]" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        let newIndex;

        if (direction === 1) {
          newIndex = prevIndex + 1;
          if (newIndex >= words.length) {
            setDirection(-1);
            newIndex = words.length - 2;
          }
        } else {
          newIndex = prevIndex - 1;
          if (newIndex < 0) {
            setDirection(1);
            newIndex = 1;
          }
        }

        return newIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [direction]);

  return (
    <div className="mx-auto max-w-[700px] shrink-0 text-center md:px-4">
      <div className="relative h-[50px] overflow-hidden max-md:mt-2 md:mb-2 lg:h-[60px]">
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index].text}
            initial={{ opacity: 0, y: direction === 1 ? 10 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction === 1 ? -10 : 10 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`absolute right-0 left-0 bg-gradient-to-r bg-clip-text text-[38px] whitespace-nowrap text-transparent lg:text-[52px] ${words[index]?.gradient ? words[index]?.gradient : "from-[#CE9FFC] to-[#7367F0]"}`}
          >
            {words[index]?.text || "A Collaborative"}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
