"use client";

import { toast } from "sonner";
import { useAccount } from "wagmi";
import Avatar from "boring-avatars";
import React, { FC, useEffect } from "react";

import shortenAddress from "@/utils/shortenAddress";

interface WalletAddressProps {
  size?: string;
  walletAddress: string;
}

interface WalletAddressWithProfileProps {
  avatarSize?: number;
  size?: string;
}

const FullWalletAddress: FC<WalletAddressProps> = ({
  size = "text-base",
  walletAddress = "0x0000...000",
}) => {
  return <p className={`pr-2 ${size}`}>{walletAddress}</p>;
};

const ShortWalletAddress: FC<WalletAddressProps> = ({
  size = "text-base",
  walletAddress = "0x0000...000",
}) => {
  if (!walletAddress) return null;

  return <p className={`pr-2 ${size}`}>{shortenAddress(walletAddress)}</p>;
};

const WalletAddressWithProfile: FC<WalletAddressWithProfileProps> = ({
  avatarSize = 28,
  size = "text-base",
}) => {
  const { address } = useAccount();
  const [walletAddress, setWalletAddress] = React.useState("0x0000...000");

  useEffect(() => {
    if (address) {
      setWalletAddress(address);
    }
  }, [address]);

  const handleCopy = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      toast.info("Address copied to clipboard");
    }
  };

  return (
    <div
      className="flex h-fit cursor-pointer items-center space-x-2 rounded-full border p-1"
      onClick={handleCopy}
    >
      <Avatar name={walletAddress} size={avatarSize} variant="beam" />
      <ShortWalletAddress walletAddress={walletAddress} size={size} />
    </div>
  );
};

export { FullWalletAddress, ShortWalletAddress, WalletAddressWithProfile };
