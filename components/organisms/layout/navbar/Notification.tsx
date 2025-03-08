"use client";
import { useState } from "react";
import Link from "next/link";
import { BellRing } from "lucide-react";
import { PingIcon } from "@/components/molecules/icons/ping";

export function Notification() {
  const [hover, setHovered] = useState(false);
  return (
    <Link
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      href="/"
      className="relative"
    >
      <div className="group rounded-full border border-gray-300 p-2 transition-all duration-300 hover:bg-gray-50">
        {hover ? <PingIcon /> : <BellRing size={24} className="size-6" />}
      </div>

      <span className="border-background absolute -end-0.5 -top-0.5 size-3 rounded-full border-2 bg-red-500">
        <span className="sr-only">Online</span>
      </span>
    </Link>
  );
}
