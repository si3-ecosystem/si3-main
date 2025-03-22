/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { LoaderIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import NotificationsItem from "./NotificationsItem";

const PushNotifications = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  const [notifications, setNotifications] = useState([]);
  const user = useSelector((state: RootState) => state.push.pushSign);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotifications = async () => {
    try {
      const fetchedNotifications = await user.channel.notifications(
        "0x0D54bD457AF5b5691d1D9790746d4C95f7885CFF",
      );

      setNotifications(fetchedNotifications.notifications);
    } catch (err) {
      setError("Failed to fetch notifications");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="mx-auto mt-8 mb-56 w-fit py-4 text-center">
        <LoaderIcon size={32} className="animate-spin text-[#B668E4]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 mb-56 py-4 text-center text-red-500">{error}</div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="mt-8 mb-56 py-4 text-center">
        No notifications available.
      </div>
    );
  }

  //   return (
  //     <div className="mx-auto w-full max-w-6xl flex-1 space-y-4 py-6">
  //       {notifications.map((notification) => (
  //         <div
  //           key={notification.notifID}
  //           className="mx-auto w-full max-w-3xl rounded-lg border border-gray-200 px-6 py-4 shadow-lg"
  //         >
  //           <div className="mb-2 flex items-center justify-between">
  //             <h3 className="text-xl font-semibold text-white">
  //               {notification.message.notification.title}
  //             </h3>

  //             <span className="text-sm text-gray-300">
  //               {formatTimestamp(notification.timestamp)}
  //             </span>
  //           </div>

  //           <p className="mb-3 text-base text-gray-400">
  //             {notification.message.notification.body}
  //           </p>

  //           {notification.message.payload?.cta && (
  //             <a
  //               href={notification.message.payload.cta}
  //               target="_blank"
  //               rel="noopener noreferrer"
  //               className="text-sm font-medium text-pink-500 hover:underline"
  //             >
  //               View Details
  //             </a>
  //           )}
  //         </div>
  //       ))}
  //     </div>
  //   );

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 space-y-4 py-6">
      {notifications.map((notification) => (
        <NotificationsItem
          key={notification.notifID}
          notification={notification}
        />
      ))}
    </div>
  );
};

export default PushNotifications;
