"use client"

import { NetworkChecker } from "@/components/network-checker"
import { BuyCarbono } from "@/components/buy-carbono"
import { MintExperiencia } from "@/components/mint-experiencia"
import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Carbono & Experiencia</h1>
          <ConnectButton />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <NetworkChecker />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <BuyCarbono />
          <MintExperiencia />
        </div>
      </main>
    </div>
  )
}