import { providers } from "ethers";
import { type Config, getClient } from "@wagmi/core";
import type { Client, Chain, Transport } from "viem";

export function clientToProvider(client: Client<Transport, Chain>) {
  const { chain, transport } = client;

  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };

  if (transport.type === "fallback")
    return new providers.FallbackProvider(
      (transport.transports as ReturnType<Transport>[]).map(
        ({ value }) => new providers.JsonRpcProvider(value?.url, network),
      ),
    );

  return new providers.JsonRpcProvider(transport.url, network);
}

export function getEthersProvider(
  config: Config,
  { chainId }: { chainId?: number } = {},
) {
  const client = getClient(config, { chainId });

  if (!client) return;
  return clientToProvider(client);
}
