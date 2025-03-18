/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    setStyle: () => void;
  }
}

const EthermailSubscribe = () => {
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
            border: 1px solid !important;
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
            filter: invert(0.8); /* Change the color of the SVG */
          }
  
          .ethermail-login-button:hover img {
            filter: invert(1); /* Change the color of the SVG on hover */
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
      afid: "677f0f8f690e56d4d9800180",
      communityAlias: "si3",
      features: ["login"],
    });
  }, []);

  return (
    <div className="flex h-20 w-full max-w-md items-center overflow-hidden">
      <ethermail-login
        widget="660289690063bda39760024a"
        type="wallet"
        permissions="write"
        on-mounted="setStyle"
      ></ethermail-login>
    </div>
  );
};

export default EthermailSubscribe;
