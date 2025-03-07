import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { metaMask, coinbaseWallet } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, sepolia],

  ssr: true,

  connectors: [
    metaMask(),
    coinbaseWallet(),
    // walletConnect({
    //   projectId: "Our ID",
    // }),
  ],

  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
