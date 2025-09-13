export const config = {
  chainId: Number.parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || "11155111"),
  carbonoAddress: process.env.NEXT_PUBLIC_CARBONO as `0x${string}`,
  experienciaAddress: process.env.NEXT_PUBLIC_EXPERIENCIA as `0x${string}`,
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL,
} as const

export const SEPOLIA_CHAIN_ID = 11155111
export const MAINNET_CHAIN_ID = 1

export function getExplorerUrl(chainId: number, hash: string, type: "tx" | "address" = "tx") {
  const baseUrl = chainId === MAINNET_CHAIN_ID ? "https://etherscan.io" : "https://sepolia.etherscan.io"

  return `${baseUrl}/${type}/${hash}`
}
