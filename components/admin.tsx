"use client"

import { useState } from "react"
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { parseEther, isAddress } from "viem"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, DollarSign, Wallet, Link } from "lucide-react"
import { carbonoABI } from "@/lib/abi/carbono"
import { experienciaABI } from "@/lib/abi/experiencia"
import { config, getExplorerUrl } from "@/lib/config"
import { toast } from "sonner"

export function Admin() {
  const [carbonoPrice, setCarbonoPrice] = useState("")
  const [experienciaPrice, setExperienciaPrice] = useState("")
  const [baseURI, setBaseURI] = useState("")
  const [treasuryAddress, setTreasuryAddress] = useState("")
  const [withdrawAddress, setWithdrawAddress] = useState("")

  const { address, isConnected } = useAccount()
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash })

  // Check if user is owner of contracts
  const { data: carbonoOwner } = useReadContract({
    address: config.carbonoAddress,
    abi: carbonoABI,
    functionName: "owner",
  })

  const { data: experienciaOwner } = useReadContract({
    address: config.experienciaAddress,
    abi: experienciaABI,
    functionName: "owner",
  })

  const isCarbonoOwner = address && carbonoOwner && address.toLowerCase() === carbonoOwner.toLowerCase()
  const isExperienciaOwner = address && experienciaOwner && address.toLowerCase() === experienciaOwner.toLowerCase()
  const isAnyOwner = isCarbonoOwner || isExperienciaOwner

  const handleSetCarbonoPrice = async () => {
    if (!isConnected || !carbonoPrice || !isCarbonoOwner) return

    try {
      const priceWei = parseEther(carbonoPrice)
      writeContract({
        address: config.carbonoAddress,
        abi: carbonoABI,
        functionName: "setPriceWeiPerToken",
        args: [priceWei],
      })

      toast.success("Price update submitted!", {
        description: "Carbono token price is being updated.",
      })
    } catch (error) {
      toast.error("Price update failed", {
        description: error instanceof Error ? error.message : "Unknown error occurred",
      })
    }
  }

  const handleSetExperienciaPrice = async () => {
    if (!isConnected || !experienciaPrice || !isExperienciaOwner) return

    try {
      const priceWei = parseEther(experienciaPrice)
      writeContract({
        address: config.experienciaAddress,
        abi: experienciaABI,
        functionName: "setPriceInCBO",
        args: [priceWei],
      })

      toast.success("NFT price update submitted!", {
        description: "Experiencia NFT price is being updated.",
      })
    } catch (error) {
      toast.error("NFT price update failed", {
        description: error instanceof Error ? error.message : "Unknown error occurred",
      })
    }
  }

  const handleSetBaseURI = async () => {
    if (!isConnected || !baseURI || !isExperienciaOwner) return

    try {
      writeContract({
        address: config.experienciaAddress,
        abi: experienciaABI,
        functionName: "setBaseURI",
        args: [baseURI],
      })

      toast.success("Base URI update submitted!", {
        description: "NFT metadata URI is being updated.",
      })
    } catch (error) {
      toast.error("Base URI update failed", {
        description: error instanceof Error ? error.message : "Unknown error occurred",
      })
    }
  }

  const handleSetTreasury = async () => {
    if (!isConnected || !treasuryAddress || !isAddress(treasuryAddress) || !isExperienciaOwner) return

    try {
      writeContract({
        address: config.experienciaAddress,
        abi: experienciaABI,
        functionName: "setTreasury",
        args: [treasuryAddress as `0x${string}`],
      })

      toast.success("Treasury update submitted!", {
        description: "Treasury address is being updated.",
      })
    } catch (error) {
      toast.error("Treasury update failed", {
        description: error instanceof Error ? error.message : "Unknown error occurred",
      })
    }
  }

  const handleWithdraw = async () => {
    if (!isConnected || !withdrawAddress || !isAddress(withdrawAddress) || !isCarbonoOwner) return

    try {
      writeContract({
        address: config.carbonoAddress,
        abi: carbonoABI,
        functionName: "withdraw",
        args: [withdrawAddress as `0x${string}`],
      })

      toast.success("Withdrawal submitted!", {
        description: "ETH withdrawal is being processed.",
      })
    } catch (error) {
      toast.error("Withdrawal failed", {
        description: error instanceof Error ? error.message : "Unknown error occurred",
      })
    }
  }

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Admin Panel
          </CardTitle>
          <CardDescription>Connect your wallet to access admin functions.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (!isAnyOwner) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Admin Panel
          </CardTitle>
          <CardDescription>
            You are not the owner of any contracts. Admin functions are restricted to contract owners.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div>Carbono Owner: {carbonoOwner}</div>
            <div>Experiencia Owner: {experienciaOwner}</div>
            <div>Your Address: {address}</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Admin Panel
          </CardTitle>
          <CardDescription>
            Manage contract settings and parameters. Only contract owners can perform these actions.
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="carbono" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="carbono" disabled={!isCarbonoOwner}>
            Carbono Admin {!isCarbonoOwner && "(Not Owner)"}
          </TabsTrigger>
          <TabsTrigger value="experiencia" disabled={!isExperienciaOwner}>
            Experiencia Admin {!isExperienciaOwner && "(Not Owner)"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="carbono" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Set CBO Token Price
              </CardTitle>
              <CardDescription>Update the price of CBO tokens in ETH.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="carbono-price">Price per CBO (in ETH)</Label>
                <Input
                  id="carbono-price"
                  type="number"
                  placeholder="0.001"
                  value={carbonoPrice}
                  onChange={(e) => setCarbonoPrice(e.target.value)}
                  step="0.000001"
                />
              </div>
              <Button
                onClick={handleSetCarbonoPrice}
                disabled={!carbonoPrice || isPending || isConfirming}
                className="w-full"
              >
                {isPending || isConfirming ? "Updating..." : "Update CBO Price"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Withdraw ETH
              </CardTitle>
              <CardDescription>Withdraw accumulated ETH from CBO sales.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="withdraw-address">Withdrawal Address</Label>
                <Input
                  id="withdraw-address"
                  placeholder="0x..."
                  value={withdrawAddress}
                  onChange={(e) => setWithdrawAddress(e.target.value)}
                />
              </div>
              <Button
                onClick={handleWithdraw}
                disabled={!withdrawAddress || !isAddress(withdrawAddress) || isPending || isConfirming}
                className="w-full"
                variant="destructive"
              >
                {isPending || isConfirming ? "Withdrawing..." : "Withdraw ETH"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experiencia" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Set NFT Price
              </CardTitle>
              <CardDescription>Update the price of Experiencia NFTs in CBO tokens.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="experiencia-price">Price per NFT (in CBO)</Label>
                <Input
                  id="experiencia-price"
                  type="number"
                  placeholder="100"
                  value={experienciaPrice}
                  onChange={(e) => setExperienciaPrice(e.target.value)}
                  step="0.01"
                />
              </div>
              <Button
                onClick={handleSetExperienciaPrice}
                disabled={!experienciaPrice || isPending || isConfirming}
                className="w-full"
              >
                {isPending || isConfirming ? "Updating..." : "Update NFT Price"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="h-4 w-4" />
                Set Base URI
              </CardTitle>
              <CardDescription>Update the base URI for NFT metadata.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="base-uri">Base URI</Label>
                <Input
                  id="base-uri"
                  placeholder="https://api.example.com/metadata/"
                  value={baseURI}
                  onChange={(e) => setBaseURI(e.target.value)}
                />
              </div>
              <Button onClick={handleSetBaseURI} disabled={!baseURI || isPending || isConfirming} className="w-full">
                {isPending || isConfirming ? "Updating..." : "Update Base URI"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Set Treasury Address
              </CardTitle>
              <CardDescription>Update the treasury address for CBO token collection.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="treasury-address">Treasury Address</Label>
                <Input
                  id="treasury-address"
                  placeholder="0x..."
                  value={treasuryAddress}
                  onChange={(e) => setTreasuryAddress(e.target.value)}
                />
              </div>
              <Button
                onClick={handleSetTreasury}
                disabled={!treasuryAddress || !isAddress(treasuryAddress) || isPending || isConfirming}
                className="w-full"
              >
                {isPending || isConfirming ? "Updating..." : "Update Treasury"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {hash && (
        <div className="text-sm text-center">
          <a
            href={getExplorerUrl(config.chainId, hash)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            View transaction on explorer →
          </a>
        </div>
      )}
    </div>
  )
}
