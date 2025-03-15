import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { metaMask, coinbaseWallet, walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, sepolia],

  ssr: true,

  connectors: [
    metaMask(),
    coinbaseWallet(),
    walletConnect({
      projectId: "82b9193221afcff90a3e7b1d94e67505",
    }),
  ],

  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
