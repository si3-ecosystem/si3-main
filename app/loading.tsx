import { LottieAnimation } from "@/components/atoms/LottieAnimation";

import AnimateLoading from "../public/loading.json";
import { InitialLoader } from "@/components/atoms/InitialLoader";

export default function Loading() {
  return (
    <InitialLoader>
      <div className="fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center bg-white">
        <LottieAnimation
          animationData={AnimateLoading}
          loop={true}
          autoplay={true}
        />
      </div>
    </InitialLoader>
  );
}
