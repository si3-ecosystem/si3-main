"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#b3e2d7"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
}
