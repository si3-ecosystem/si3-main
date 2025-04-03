"use client";

import { useConnect } from "wagmi";
import LoginButton from "./LoginButton";

function WalletConnectButtons() {
  const { connectors } = useConnect();

  return (
    <>
      {connectors.map((connector) => (
        <LoginButton key={connector.id} connector={connector} />
      ))}
    </>
  );
}

export default WalletConnectButtons;
