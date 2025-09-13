// lib/wagmi.ts
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia, mainnet } from "wagmi/chains";
import { http } from "viem";

export const wagmiConfig = getDefaultConfig({
  appName: "Carbono & Experiencia",
  projectId: "2f05a7cac472eca42db5a3912f4e8c7c",
  chains: [sepolia, mainnet],
  transports: {
    [sepolia.id]: http("https://rpc.sepolia.org"),
    [mainnet.id]: http(),
  },
  ssr: false,
});
