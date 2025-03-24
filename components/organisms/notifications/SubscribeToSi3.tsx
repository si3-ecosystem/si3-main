'use client'

import { toast } from "sonner";
import { useAccount } from "wagmi";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import { RootState } from "@/redux/store";

import { Button } from "@/components/atoms/button";

const SubscribeToSi3 = () => {
  const { status } = useAccount();

  const user = useSelector((state: RootState) => state.push.pushSign);
  const isConnected = useSelector((state: RootState) => state.push.isConnected);

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);

  const subscribeNow = async () => {
    try {
      if (status === "connected") {
        if (!isConnected) {
          toast.error("Connect to Push");
          return;
        }

        await user.notification.subscribe(
          `0x0D54bD457AF5b5691d1D9790746d4C95f7885CFF`,
        );

        toast.success("Subscribed to Si");
        setIsSubscribed(true);
      } else {
        toast.error("Please connect your wallet or log in.");
      }
    } catch (error) {
      console.error("Failed to Subscribe to Si:", error);
      toast.error("Failed to Subscribe to Si. Please try again.");
    }
  };

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        setLoading(true);

        if (status === "connected" && isConnected && user) {
          console.log("Check");
          const subscriptions = await user.notification.subscriptions();

          const isUserSubscribed = subscriptions.some(
            (sub) =>
              sub.channel === "0x0D54bD457AF5b5691d1D9790746d4C95f7885CFF",
          );

          setIsSubscribed(isUserSubscribed);
        }
      } catch (error) {
        console.error("Failed to check subscription:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(checkSubscription, 100);

    return () => clearTimeout(timeoutId);
  }, [status, isConnected, user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Button onClick={subscribeNow} disabled={isSubscribed}>
      {isSubscribed ? "Subscribed" : "Subscribe to Si"}
    </Button>
  );
};

export default SubscribeToSi3;
