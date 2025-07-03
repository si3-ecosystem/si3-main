import React from "react";
import { processMetadata } from "@/utils/sharedMetadata";

import { Footer } from "@/components/organisms/layout/Footer";
import { Navbar } from "@/components/organisms/layout/Navbar";

// import SubscribeToSi3 from "@/components/organisms/notifications/SubscribeToSi3";
import PushNotifContainer from "@/components/organisms/notifications/NotificationContainer";

export async function generateMetadata() {
  return await processMetadata();
}

const NotificationsPage = () => {
  return (
    <div className="flex flex-col justify-between overflow-x-hidden">
      <Navbar />

      <main className="mt-14 h-full w-full flex-1">
        <div className="flex-center relative mx-auto my-10 w-full max-w-[1440px] flex-1 flex-col px-4 py-3 lg:px-24">
          <div className="sticky top-0 flex w-full items-center justify-between border-b border-gray-700 px-5 py-3">
            <h2 className="text-3xl font-bold">Ecosystem Highlights</h2>

            {/* <SubscribeToSi3 /> */}
          </div>

          <PushNotifContainer />
        </div>
      </main>

      <Footer utils={{ mediakit: "" }} />
    </div>
  );
};

export default NotificationsPage;
