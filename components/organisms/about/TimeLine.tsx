"use client";

import { motion } from "framer-motion";

interface TimelineItem {
  year: string;
  content: string;
  isActive: boolean;
  subtitle?: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  const lastActiveIndex = items.reduce((lastIndex, item, index) => {
    return item.isActive ? index : lastIndex;
  }, -1);

  const lineExtendIndex = Math.min(lastActiveIndex + 1, items.length - 1);

  return (
    <div className="lg:py-90px] relative py-14 pl-8">
      <div className="absolute top-[60px] bottom-0 left-10 w-[2px] bg-gray-200 lg:left-[12rem]" />

      <div
        className="absolute top-[60px] left-10 w-[2px] bg-purple-500 lg:left-[12rem]"
        style={{
          height: lineExtendIndex >= 0 ? `${(lineExtendIndex + 1) * 140}px` : 0,
        }}
      />

      <div
        className="absolute -top-5 left-10 h-[80px] w-[2px] bg-purple-500 lg:left-[12rem]"
        style={{
          transform: "rotate(-45deg)",
          transformOrigin: "bottom left",
        }}
      />

      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="relative mb-20 last:mb-0"
        >
          {index === 0 ? (
            <div
              className={`absolute left-2 z-20 h-4 w-4 -translate-x-1/2 rotate-45 transform lg:left-[10rem] ${
                item.isActive ? "bg-purple-500" : "bg-gray-300"
              }`}
              style={{ top: "50%" }}
            />
          ) : (
            <div
              className={`absolute left-2 z-20 h-4 w-4 -translate-x-1/2 transform rounded-full lg:left-[10rem] ${
                item.isActive ? "bg-purple-500" : "bg-gray-300"
              }`}
              style={{ top: "50%" }}
            />
          )}

          <div className="ml-10 max-w-[662px] sm:ml-16 lg:ml-[14rem]">
            <div className="rounded-lg bg-gray-50 p-6">
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                {item.year}
                {item.subtitle && (
                  <div className="mt-1 text-xs font-normal uppercase">
                    {item.subtitle}
                  </div>
                )}
              </h3>
              <p className="text-gray-600">{item.content}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
