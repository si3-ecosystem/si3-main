import React from "react";
import Link from "next/link";

import LoginMail from "./LoginMail";
import EtherMail from "./EtherMail";
import LoginButton from "./LoginButton";
import LoginFooter from "./LoginFooter";

import Logo from "@/components/atoms/Logo";

const LoginMain = () => {
  return (
    <section className="mx-auto max-w-md">
      <Link href="/" className="mx-auto max-w-md">
        <Logo src="/logo.svg" />
      </Link>

      <div className="mt-16">
        <h1 className="text-4xl font-bold">Login</h1>

        <p className="mt-2 text-lg font-medium">
          It&apos;s so nice to SI you 👋
        </p>
      </div>

      <div className="mt-4 space-y-3 md:mt-6 md:space-y-4">
        <LoginButton
          src="/login/metamask-logo.svg"
          alt="Metamask"
          label="Metamask"
          num={0}
        />

        {/* <LoginButton
          src="/login/coinbase-logo.svg"
          alt="Coinbase"
          label="Coinbase"
          num={1}
        /> */}

        <LoginButton
          src="/login/wallet-connect-logo.svg"
          alt="Wallet Connect"
          label="WalletConnect"
          num={1}
        />

        <LoginButton
          src="/login/safe-logo.png"
          alt="Safe Multisig"
          label="Safe Multisig"
          num={2}
        />

        <EtherMail />
      </div>

      <div className="my-6 flex items-center md:my-8">
        <hr className="flex-grow border-gray-300" />

        <span className="md:text-md px-2 text-xs text-gray-500 md:px-3">
          OR
        </span>

        <hr className="flex-grow border-gray-300" />
      </div>

      <LoginMail />
      <LoginFooter />
    </section>
  );
};

export default LoginMain;
