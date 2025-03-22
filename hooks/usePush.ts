/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getEthersSigner } from "@/wagmi/ethersSigner";
import { setConnected, setPushSign } from "@/redux/slice/pushSlice";

import { config } from "@/config/wagmiConfig";

const usePush = () => {
  const dispatch = useDispatch();

  const [isConnected, setIsConnected] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const initPushStream = async () => {
    try {
      const signer = await getEthersSigner(config);

      const user = await PushAPI.initialize(signer, {
        env: CONSTANTS.ENV.PROD,
      });

      dispatch(setConnected(true));
      dispatch(setPushSign(user));

      if (user.errors.length > 0) {
        console.log("Error");
      }

      const stream = await user.initStream(
        [
          CONSTANTS.STREAM.CHAT,
          CONSTANTS.STREAM.CONNECT,
          CONSTANTS.STREAM.DISCONNECT,
        ],
        {
          filter: { channels: ["*"] },
          connection: { retries: 3 },
          raw: false,
        },
      );

      stream.on(CONSTANTS.STREAM.CONNECT, () => {
        console.log("Stream Connected");
      });

      stream.on(CONSTANTS.STREAM.NOTIF, (notification) => {
        console.log("Notification received:", notification);
      });

      stream.on(CONSTANTS.STREAM.DISCONNECT, () => {
        console.log("Stream Disconnected");
      });

      await stream.connect();

      return () => {
        stream.disconnect();
      };
    } catch (error) {
      console.error("Error initializing Push stream:", error);
    }
  };

  return { initPushStream };
};

export default usePush;
