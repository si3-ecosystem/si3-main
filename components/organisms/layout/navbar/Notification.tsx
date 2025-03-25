"use client";

import { useState } from "react";
import Image from "next/image";
import { BellRing } from "lucide-react";
import { useRouter } from "next/navigation";

export function Notification() {
  const router = useRouter();
  const [hover, setHovered] = useState(false);

  const handleNotification = () => {
    router.push("/si3-highlights");
  };

  return (
    <div
      className="relative h-11 cursor-pointer"
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      onClick={() => handleNotification()}
    >
      <div className="group rounded-full border border-gray-300 p-2 transition-all duration-300 hover:bg-gray-50">
        {hover ? (
          <Image src="/push.svg" alt="Push Logo" width={24} height={24} />
        ) : (
          <BellRing size={24} className="size-6" />
        )}
      </div>

      <span className="border-background absolute -end-0.5 -top-0.5 size-3 rounded-full border-2 bg-red-500">
        <span className="sr-only">Online</span>
      </span>
    </div>
  );
}
