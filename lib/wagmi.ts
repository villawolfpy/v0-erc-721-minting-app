// lib/wagmi.ts
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { metaMaskWallet, walletConnectWallet, injectedWallet } from "@rainbow-me/rainbowkit/wallets";
import { sepolia, mainnet } from "wagmi/chains";
import { http } from "viem";
import { config } from "./config";

export const wagmiConfig = getDefaultConfig({
  appName: "Carbono & Experiencia",
  projectId: "2f05a7cac472eca42db5a3912f4e8c7c",
  chains: [sepolia, mainnet],
  transports: {
    [sepolia.id]: http(config.rpcUrl),
    [mainnet.id]: http(),
  },
  ssr: false,
  wallets: [
    // Exclude Coinbase Wallet to avoid analytics errors
    {
      groupName: "Popular",
      wallets: [metaMaskWallet, walletConnectWallet, injectedWallet],
    },
  ],
});
