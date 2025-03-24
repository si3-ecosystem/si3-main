import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { metaMask, safe, walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, sepolia],

  ssr: true,

  connectors: [
    metaMask(),
    walletConnect({
      projectId: "678a4a86ff4f89d192c79eea1d8faf18",
    }),
    safe(),
  ],

  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
