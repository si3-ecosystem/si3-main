"use client";

import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";

import PushButton from "./PushButton";
import PushNotifications from "./PushNotifications";

const PushNotifContainer = () => {
  const isConnected = useSelector((state: RootState) => state.push.isConnected);

  return (
    <div className="flex-center mx-auto w-full max-w-6xl flex-1">
      {isConnected ? <PushNotifications /> : <PushButton />}
    </div>
  );
};

export default PushNotifContainer;
