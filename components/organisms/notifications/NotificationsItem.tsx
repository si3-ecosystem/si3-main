// "use client";

// import { ScrollText } from "lucide-react";
// import React, { useState, useRef, useEffect } from "react";

// const NotificationsItem = ({ notificationTitle, notificationText }) => {
//   const textRef = useRef<HTMLParagraphElement>(null);

//   const [isTruncated, setIsTruncated] = useState(true);
//   const [showFullText, setShowFullText] = useState(false);

//   useEffect(() => {
//     const checkTruncation = () => {
//       if (textRef.current) {
//         setIsTruncated(textRef.current.scrollHeight > 78);
//       }
//     };

//     const timeoutId = setTimeout(checkTruncation, 100);

//     return () => clearTimeout(timeoutId);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [notificationText]);

//   return (
//     <div className="flex items-start space-x-4 rounded-md border border-[#B668E4] bg-[#FBF6FE] px-2 py-3 sm:px-3 sm:py-4 md:space-x-6 lg:items-center">
//       <div className="rounded-full bg-[#B668E4] p-3 sm:p-4">
//         <ScrollText className="h-5 w-5 text-sm text-white lg:h-6 lg:w-6 2xl:h-8 2xl:w-8" />
//       </div>

//       <div className="flex flex-grow items-start justify-between gap-3">
//         <div className="max-w-2xl space-y-3">
//           <h3 className="mb-1.5 text-lg font-bold md:text-xl">
//             {notificationTitle}
//           </h3>

//           <div>
//             <p
//               ref={textRef}
//               className={`text-sm leading-relaxed text-gray-500 md:text-base ${
//                 isTruncated && !showFullText ? "line-clamp-3" : ""
//               }`}
//             >
//               {notificationText}
//             </p>

//             {isTruncated && (
//               <button
//                 onClick={() => setShowFullText(!showFullText)}
//                 className="cursor-pointer text-sm font-bold text-[#B668E4]"
//               >
//                 {showFullText ? "Less" : "More"}
//               </button>
//             )}
//           </div>
//         </div>

//         <div className="ml-3.5 hidden text-sm whitespace-nowrap text-gray-400 md:block">
//           16 Sec ago
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotificationsItem;

"use client";

import { ScrollText } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const NotificationsItem = ({ notification }) => {
  const textRef = useRef<HTMLParagraphElement>(null);

  const [isTruncated, setIsTruncated] = useState(true);
  const [showFullText, setShowFullText] = useState(false);

  useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        setIsTruncated(textRef.current.scrollHeight > 78);
      }
    };

    const timeoutId = setTimeout(checkTruncation, 100);

    return () => clearTimeout(timeoutId);
  }, [notification.message.notification.body]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    if (diff < 60000) {
      return "Just now";
    } else if (diff < 3600000) {
      const minutes = Math.floor(diff / 60000);
      return `${minutes} min ago`;
    } else if (diff < 86400000) {
      const hours = Math.floor(diff / 3600000);
      return `${hours} hours ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="flex items-start space-x-4 rounded-md border border-[#B668E4] bg-[#FBF6FE] px-2 py-3 sm:px-3 sm:py-4 md:space-x-6 lg:items-center">
      <div className="rounded-full bg-[#B668E4] p-3 sm:p-4">
        <ScrollText className="h-5 w-5 text-sm text-white lg:h-6 lg:w-6 2xl:h-8 2xl:w-8" />
      </div>

      <div className="flex flex-grow items-start justify-between gap-3">
        <div className="max-w-2xl space-y-3">
          <h3 className="mb-1.5 text-lg font-bold md:text-xl">
            {notification.message.payload.title}
          </h3>

          <div>
            <p
              ref={textRef}
              className={`text-sm leading-relaxed text-gray-500 md:text-base ${
                isTruncated && !showFullText ? "line-clamp-3" : ""
              }`}
              dangerouslySetInnerHTML={{
                __html: notification.message.payload.body.replace(
                  /\n/g,
                  "<br />",
                ),
              }}
            ></p>

            {isTruncated && (
              <button
                onClick={() => setShowFullText(!showFullText)}
                className="cursor-pointer text-sm font-bold text-[#B668E4]"
              >
                {showFullText ? "Less" : "More"}
              </button>
            )}

            {notification.message.payload?.cta && (
              <a
                href={notification.message.payload.cta}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-sm font-medium text-pink-500 hover:underline"
              >
                View Details
              </a>
            )}
          </div>
        </div>

        <div className="ml-3.5 hidden text-sm whitespace-nowrap text-gray-400 md:block">
          {formatTimestamp(notification.timestamp)}
        </div>
      </div>
    </div>
  );
};

export default NotificationsItem;
