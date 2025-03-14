"use client";

import { Card } from "@/components/atoms/card";
import { TimelineSchema } from "@/types/about";
import { motion } from "framer-motion";

interface TimelineProps {
  items: TimelineSchema;
}

export function Timeline({ items }: TimelineProps) {
  const lastActiveIndex = items?.timelineItems?.reduce(
    (lastIndex, item, index) => {
      return item.isActive ? index : lastIndex;
    },
    -1,
  );

  const lineExtendIndex = Math.min(
    lastActiveIndex + 1,
    items.timelineItems.length - 1,
  );

  return (
    <div className="">
      <div className="relative py-14 pl-8 max-sm:hidden lg:py-[90px]">
        <h2 className="font-clesmont text-[32px] text-black lg:-mt-16 lg:mb-24 lg:ml-56">
          {"SI<3>'s"} Timeline
        </h2>
        <div className="absolute top-[60px] bottom-0 left-10 w-[2px] bg-gray-200 lg:left-[12rem]" />

        <div
          className="absolute top-[60px] left-10 w-[2px] bg-purple-500 lg:left-[12rem]"
          style={{
            height:
              lineExtendIndex >= 0 ? `${(lineExtendIndex + 1) * 140}px` : 0,
          }}
        />

        <div
          className="absolute -top-5 left-10 h-[80px] w-[2px] bg-purple-500 lg:left-[12rem]"
          style={{
            transform: "rotate(-45deg)",
            transformOrigin: "bottom left",
          }}
        />

        {items.timelineItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="relative mb-20 last:mb-0"
          >
            {index === 0 ? (
              <div
                className={`absolute left-2 z-20 h-4 w-4 -translate-x-1/2 rotate-45 transform lg:left-[9.8rem] ${
                  item.isActive ? "bg-purple-500" : "bg-gray-300"
                }`}
                style={{
                  top: "50%",
                  transformOrigin: "bottom left",
                }}
              />
            ) : (
              <div
                className={`absolute left-2 z-20 h-4 w-4 -translate-x-1/2 transform rounded-full lg:left-[10rem] ${
                  item.isActive ? "bg-purple-500" : "bg-gray-300"
                }`}
                style={{
                  top: "50%",
                  transformOrigin: "bottom left",
                }}
              />
            )}

            <div className="ml-10 max-w-[662px] sm:ml-16 lg:ml-[14rem]">
              <div className="flex items-center justify-start gap-24 rounded-lg bg-gray-50 p-6">
                <div className="mb-2 max-w-[136px] min-w-[136px] text-lg font-semibold text-gray-900">
                  <span className="font-clesmont text-2xl text-black uppercase">
                    {item.year}
                  </span>

                  <div className="font-clesmont text-sm font-normal uppercase">
                    {item.subtitle}
                  </div>
                </div>
                <p className="text-gray-600">{item.content}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative px-4 py-14 sm:hidden lg:py-[90px]">
        <h2 className="font-clesmont mb-[34px] text-center text-[32px] text-black">
          {"SI<3>'s"} Timeline
        </h2>
        <ul className="grid grid-cols-1 gap-8">
          {items.timelineItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              <Card className="flex flex-col gap-4 bg-[#f6f6f6] p-4 hover:shadow-md">
                <h3 className="font-clesmont text-2xl uppercase">
                  {item.year}
                </h3>
                {item.subtitle && (
                  <h3 className="font-clesmont text-2xl uppercase">
                    {item.subtitle}
                  </h3>
                )}
                <p className="text-lg text-black">{item.content}</p>
              </Card>
            </motion.div>
          ))}
        </ul>
      </div>
    </div>
  );
}
