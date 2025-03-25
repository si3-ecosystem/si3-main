// /* eslint-disable @typescript-eslint/ban-ts-comment */
// // @ts-nocheck

// "use client";

// import { useEffect } from "react";

// declare global {
//   interface Window {
//     setStyle: () => void;
//   }
// }

// const EtherMail = () => {
//   useEffect(() => {
//     window.setStyle = function () {
//       const element = document.querySelector("ethermail-login");
//       if (element && element.shadowRoot) {
//         const style = document.createElement("style");
//         style.textContent = `
//           .ethermail-login-button {
//             display: flex !important;
//             width: 100% !important;
//             cursor: pointer !important;
//             align-items: center !important;
//             border-radius: 0.5rem !important;
//             border: 1px solid #f3f4f6 !important;
//             background-color: #f3f4f6 !important;
//             padding: 0.5rem 1rem !important;
//             transition: background-color 0.3s !important;
//             color: #000 !important;
//             justify-content: start !important;
//             font-weight: bold !important;
//             font-size: 1rem !important;
//           }

//           .ethermail-login-button:hover {
//             background-color: #e5e7eb !important;
//           }

//           .ethermail-login-button img {
//             filter: invert(0.8); /* Change the color of the SVG */
//           }

//           .ethermail-login-button:hover img {
//             filter: invert(1); /* Change the color of the SVG on hover */
//           }
//         `;
//         element.shadowRoot.appendChild(style);

//         const spanElement = element.shadowRoot.querySelector(
//           ".ethermail-login-button span",
//         );
//         if (spanElement) {
//           spanElement.textContent = "EtherMail";
//         }
//       }
//     };
//   }, []);

//   useEffect(() => {
//     (function ({ ...args }) {
//       const p = document.createElement("script");

//       p.src = "https://cdn-email.ethermail.io/sdk/v2/ethermail.js";

//       document.body.appendChild(p);

//       p.setAttribute("a", args.afid);
//       p.setAttribute("b", args.communityAlias);
//       p.setAttribute("c", args.features);
//     })({
//       afid: "66e644fcb593edd053b3f5ca",
//       communityAlias: "si3",
//       features: ["login"],
//     });
//   }, []);

//   return (
//     <div className="w-full max-w-md overflow-hidden rounded-lg border">
//       <ethermail-login
//         widget="67b0e30547bb5daf3c21fa37"
//         type="wallet"
//         permissions="write"
//         on-mounted="setStyle"
//       ></ethermail-login>
//     </div>
//   );
// };

// export default EtherMail;

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    setStyle: () => void;
  }
}

const EtherMail = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Function to handle successful wallet connection
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSuccess = (event: any) => {
    const { detail } = event;
    if (detail && detail.address) {
      setWalletAddress(detail.address);
      console.log("Connected to EtherMail:", detail);
    }
  };

  // Function to handle wallet disconnection
  const handleDisconnect = () => {
    setWalletAddress(null);
    console.log("Disconnected from EtherMail");
  };

  useEffect(() => {
    window.setStyle = function () {
      const element = document.querySelector("ethermail-login");

      if (element && element.shadowRoot) {
        const style = document.createElement("style");
        style.textContent = `
          .ethermail-login-button {
            display: flex !important;
            width: 100% !important;
            cursor: pointer !important;
            align-items: center !important;
            border-radius: 0.5rem !important;
            border: 1px solid #f3f4f6 !important;
            background-color: #f3f4f6 !important;
            padding: 0.5rem 1rem !important;
            transition: background-color 0.3s !important;
            color: #000 !important;
            justify-content: start !important;
            font-weight: bold !important;
            font-size: 1rem !important;
          }

          .ethermail-login-button:hover {
            background-color: #e5e7eb !important;
          }

          .ethermail-login-button img {
            filter: invert(0.8);
          }

          .ethermail-login-button:hover img {
            filter: invert(1);
          }
        `;
        element.shadowRoot.appendChild(style);

        const spanElement = element.shadowRoot.querySelector(
          ".ethermail-login-button span",
        );
        if (spanElement) {
          spanElement.textContent = "EtherMail";
        }
      }
    };
  }, []);

  useEffect(() => {
    (function ({ ...args }) {
      const p = document.createElement("script");

      p.src = "https://cdn-email.ethermail.io/sdk/v2/ethermail.js";
      document.body.appendChild(p);

      p.setAttribute("a", args.afid);
      p.setAttribute("b", args.communityAlias);
      p.setAttribute("c", args.features);
    })({
      afid: "66e644fcb593edd053b3f5ca",
      communityAlias: "si3",
      features: ["login"],
    });

    window.addEventListener("EtherMailSignInOnSuccess", handleSuccess);

    return () => {
      window.removeEventListener("EtherMailSignInOnSuccess", handleSuccess);
    };
  }, []);

  return (
    <div className="w-full max-w-md overflow-hidden rounded-lg border">
      {walletAddress ? (
        <div className="flex flex-col items-center gap-3">
          <p className="text-lg font-semibold">Connected: {walletAddress}</p>
          <button
            onClick={handleDisconnect}
            className="rounded-lg bg-red-500 px-4 py-2 text-white"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <ethermail-login
          widget="67b0e30547bb5daf3c21fa37"
          type="wallet"
          permissions="write"
          on-mounted="setStyle"
        ></ethermail-login>
      )}
    </div>
  );
};

export default EtherMail;
