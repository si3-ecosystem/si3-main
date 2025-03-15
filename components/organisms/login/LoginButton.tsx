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
  num: number;
}

const LoginButton: FC<LoginButtonProps> = ({ src, alt, label, num }) => {
  const account = useAccount();
  const { connect, connectors } = useConnect();

  const router = useRouter();

  const isValidConnector = num >= 0 && num < connectors.length;

  useEffect(() => {
    if (account) {
      router.push("/");
      toast.success("Logged in successfully");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    if (isValidConnector) {
      connect({
        connector: connectors[num],
      });

      router.push("/");

      toast.success("Wallet connected successfully");
    } else {
      toast.error("Something went wrong");
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
