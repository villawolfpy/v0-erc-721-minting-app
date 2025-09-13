// lib/wagmi.ts
import { createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

// Usa el RPC público si no hay variable
const RPC = process.env.NEXT_PUBLIC_RPC_URL || "https://rpc.sepolia.org";

export const wagmiConfig = createConfig({
  chains: [sepolia],
  // Conector "injected" (Metamask/Brave/etc.) — NO requiere WalletConnect ni projectId
  connectors: [injected({ shimDisconnect: true })],
  transports: {
    [sepolia.id]: http(RPC),
  },
  // Next App Router hace SSR: esto evita warnings de hidratación
  ssr: true,
});
