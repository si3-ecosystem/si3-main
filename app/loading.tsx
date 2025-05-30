import { LottieAnimation } from "@/components/atoms/LottieAnimation";

import AnimateLoading from "../public/loading.json";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center bg-white">
      <LottieAnimation
        animationData={AnimateLoading}
        loop={true}
        autoplay={true}
      />
    </div>
  );
}
