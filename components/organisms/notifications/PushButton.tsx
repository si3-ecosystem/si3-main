"use client";

import React from "react";
import Image from "next/image";

import usePush from "@/hooks/usePush";
import { useAccount } from "wagmi";
import { toast } from "sonner";

const PushButton = () => {
  const { status } = useAccount();

  const { initPushStream } = usePush();

  const handlePush = async () => {
    try {
      if (status === "connected") {
        await initPushStream();
      } else {
        toast.error("Please connect your wallet or log in.");
      }
    } catch (error) {
      console.error("Error initializing push stream:", error);
      toast.error("Failed to initialize push stream. Please try again.");
    }
  };

  return (
    <section className="mt-8 mb-64">
      <button
        onClick={handlePush}
        className="mx-auto flex cursor-pointer items-center gap-3 rounded-lg border border-black px-3 py-2"
      >
        <Image src="/push.svg" width={36} height={36} alt="Push Logo" />

        <p className="text-lg font-medium">Connect with Push</p>
      </button>
    </section>
  );
};

export default PushButton;
