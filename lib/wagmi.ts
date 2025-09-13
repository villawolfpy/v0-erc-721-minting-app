// lib/wagmi.ts
import { createConfig, http } from "wagmi";
import { sepolia, mainnet } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { config } from "./config";

// Configuración de RPC con Infura
const getRpcUrl = (chainId: number) => {
  if (config.infuraApiKey) {
    return chainId === 1 
      ? `https://mainnet.infura.io/v3/${config.infuraApiKey}`
      : `https://sepolia.infura.io/v3/${config.infuraApiKey}`;
  }
  return config.rpcUrl || "https://rpc.sepolia.org";
};

export const wagmiConfig = createConfig({
  chains: [sepolia, mainnet],
  // Conector "injected" (Metamask/Brave/etc.) — NO requiere WalletConnect ni projectId
  connectors: [injected({ shimDisconnect: true })],
  transports: {
    [sepolia.id]: http(getRpcUrl(sepolia.id)),
    [mainnet.id]: http(getRpcUrl(mainnet.id)),
  },
  // Next App Router hace SSR: esto evita warnings de hidratación
  ssr: false,
});
