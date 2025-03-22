// "use client";

// import NotificationsItem from "@/components/organisms/notifications/NotificationsItem";

// const NotificationPage: React.FC = () => {

//   const notificationTitle = "Notification Title";

//   const notificationText =
//     "Lorem ipsum dolor sit amet consectetur. Morbi venenatis ante viverra vel aliquet fusce. In leo consequat tortor etiam aliquet nunc. This is a longer text to demonstrate the 'more' functionality.";

//   return (
//     <div className="mx-4 my-18 h-auto max-w-5xl space-y-8 sm:mx-10 lg:mx-auto">
//       <div className="space-y-1">
//         <h2 className="mb-2.5 text-base text-gray-600">Today</h2>

//         <div className="space-y-4">
//           <NotificationsItem
//             notificationTitle={notificationTitle}
//             notificationText={notificationText}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotificationPage;

"use client";

import React from "react";

import PushNotifContainer from "@/components/organisms/notifications/NotificationContainer";
import SubscribeToSi3 from "@/components/organisms/notifications/SubscribeToSi3";

const NotificationsPage = () => {
  return (
    <div className="flex-center relative mx-auto my-10 w-full max-w-[1440px] flex-1 flex-col px-4 py-3 lg:px-24">
      <div className="sticky top-0 flex w-full items-center justify-between border-b border-gray-700 px-5 py-3">
        <h2 className="text-3xl font-bold">Your Notification</h2>

        <SubscribeToSi3 />
      </div>

      <PushNotifContainer />
    </div>
  );
};

export default NotificationsPage;
