"use client";

import { toast } from "sonner";
import { useState } from "react";
// import Link from "next/link";
import { useAccount } from "wagmi";
import { BellRing } from "lucide-react";
import { useRouter } from "next/navigation";

import usePush from "@/hooks/usePush";

import { PingIcon } from "@/components/molecules/icons/PingIcon";

export function Notification() {
  const router = useRouter();
  const { status } = useAccount();
  const [hover, setHovered] = useState(false);

  const { initPushStream } = usePush();

  const handleNotification = () => {
    if (status === "connected") {
      initPushStream();
    } else {
      router.push("/login");
      toast.error("Please login to view notifications");
    }
  };

  return (
    <div
      className="relative"
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      onClick={() => handleNotification()}
    >
      <div className="group rounded-full border border-gray-300 p-2 transition-all duration-300 hover:bg-gray-50">
        {hover ? <PingIcon /> : <BellRing size={24} className="size-6" />}
      </div>

      <span className="border-background absolute -end-0.5 -top-0.5 size-3 rounded-full border-2 bg-red-500">
        <span className="sr-only">Online</span>
      </span>
    </div>
  );
}
