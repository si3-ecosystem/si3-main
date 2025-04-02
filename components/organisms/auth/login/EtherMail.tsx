/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

"use client";

import jwt from "jsonwebtoken";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setAddress, setConnected, setUser } from "@/redux/slice/userSlice";

declare global {
  interface Window {
    setStyle: () => void;
  }
}

const EtherMail = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.addEventListener("EtherMailSignInOnSuccess", (event: any) => {
      const __loginEvent = event;
      const ethermailUser = jwt.decode(__loginEvent.detail.token);

      dispatch(setUser(ethermailUser));
      dispatch(setConnected(true));
      dispatch(setAddress(ethermailUser.wallet));

      router.replace("/");
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  }, []);

  return (
    <div className="w-full max-w-md overflow-hidden rounded-lg border">
      <ethermail-login
        widget="67b0e30547bb5daf3c21fa37"
        type="wallet"
        permissions="write"
        on-mounted="setStyle"
        label="Ethermail"
      ></ethermail-login>
    </div>
  );
};

export default EtherMail;
