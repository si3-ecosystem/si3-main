"use client";

import { toast } from "sonner";
import Image from "next/image";
import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useConnect } from "wagmi";

interface LoginButtonProps {
  src: string;
  alt: string;
  label: string;
  num?: number;
}

const LoginButton: FC<LoginButtonProps> = ({ src, alt, label, num = 0 }) => {
  const router = useRouter();
  const { status } = useAccount();
  const { connect, connectors } = useConnect();

  const isValidConnector = num >= 0 && num < connectors.length;

  useEffect(() => {
    if (status === "connected") {
      router.push("/");
      toast.success("Wallet connected successfully");
    }
  }, [status, router]);

  const handleClick = async () => {
    if (status === "connected") {
      router.push("/");
      return;
    }

    if (isValidConnector) {
      try {
        connect({ connector: connectors[num] });
      } catch (error) {
        console.error(error);
        toast.error("Failed to connect wallet");
      }
    } else {
      toast.error("Invalid connector");
    }
  };

  return (
    <button
      className="flex w-full cursor-pointer items-center gap-4 rounded-lg border bg-gray-100 p-2 px-4 py-2 hover:bg-gray-200"
      onClick={handleClick}
    >
      <Image src={src} alt={alt} width={20} height={20} />
      <span className="text-base font-semibold">{label}</span>
    </button>
  );
};

export default LoginButton;
