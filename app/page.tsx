"use client"

import { useState, useEffect } from "react"
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { parseEther } from "viem"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Icons } from "@/components/icons"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { carbonoABI } from "@/lib/abi/carbono"
import { experienciaABI } from "@/lib/abi/experiencia"
import { config } from "@/lib/config"
import { toast } from "sonner"

export default function HomePage() {
  const [quantity, setQuantity] = useState("")
  
  const { address, isConnected } = useAccount()
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash })

  // Read contract data
  const { data: carbonoBalance } = useReadContract({
    address: config.carbonoAddress,
    abi: carbonoABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
  })

  const { data: experienciaBalance } = useReadContract({
    address: config.experienciaAddress,
    abi: experienciaABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
  })

  const { data: carbonoPrice } = useReadContract({
    address: config.carbonoAddress,
    abi: carbonoABI,
    functionName: "priceWeiPerToken",
  })

  const { data: experienciaPrice } = useReadContract({
    address: config.experienciaAddress,
    abi: experienciaABI,
    functionName: "priceInCBO",
  })

  const buyCarbono = async (amount: string) => {
    if (!isConnected || !carbonoPrice) return

    try {
      const totalPrice = BigInt(amount) * BigInt(carbonoPrice)
      
      writeContract({
        address: config.carbonoAddress,
        abi: carbonoABI,
        functionName: "buyCarbono",
        value: totalPrice,
      })

      toast.success("Transacción enviada", {
        description: `Comprando ${amount} tokens CBO...`,
      })
    } catch (error) {
      toast.error("Error en la transacción", {
        description: error instanceof Error ? error.message : "Error desconocido",
      })
    }
  }

  const mintExperiencia = async () => {
    if (!isConnected || !experienciaPrice) return

    try {
      writeContract({
        address: config.experienciaAddress,
        abi: experienciaABI,
        functionName: "mint",
        args: [BigInt(1)], // Mintear 1 NFT
      })

      toast.success("Transacción enviada", {
        description: "Minteando NFT de Experiencia...",
      })
    } catch (error) {
      toast.error("Error al mintear NFT", {
        description: error instanceof Error ? error.message : "Error desconocido",
      })
    }
  }

  const handleBuy = async () => {
    if (!quantity || Number(quantity) <= 0) {
      toast.error("Cantidad inválida", {
        description: "Por favor ingresa una cantidad válida",
      })
      return
    }
    await buyCarbono(quantity)
    setQuantity("")
  }

  const formatAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ""
  const isLoading = isPending || isConfirming
  
  // Verificar si las direcciones de los contratos están configuradas
  const isContractConfigured = config.carbonoAddress !== "0x0000000000000000000000000000000000000000" && 
                              config.experienciaAddress !== "0x0000000000000000000000000000000000000000"

  // Estado de carga para evitar parpadeo
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Mostrar pantalla de carga mientras se hidrata
  if (!isClient) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold mb-2">Carbono & Experiencia</h2>
          <p className="text-muted-foreground">Cargando aplicación...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                🌱
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Carbono & Experiencia</h1>
                <p className="text-sm text-muted-foreground">Plataforma Web3 de Tokens de Carbono y NFTs</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ConnectButton />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!isContractConfigured && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 text-yellow-600">⚠️</div>
              <div>
                <h3 className="font-semibold text-yellow-800">Contratos no configurados</h3>
                <p className="text-sm text-yellow-700">
                  Las direcciones de los contratos inteligentes no están configuradas. 
                  Por favor, configura las variables de entorno NEXT_PUBLIC_CARBONO y NEXT_PUBLIC_EXPERIENCIA.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {!isConnected ? (
          <div className="text-center py-12">
            <div className="h-16 w-16 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
              🌱
            </div>
            <h2 className="text-3xl font-bold mb-4">Bienvenido a Carbono & Experiencia</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Una plataforma descentralizada para comercializar tokens de carbono y mintear NFTs de experiencias únicas.
              Conecta tu wallet para comenzar.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="p-6 border rounded-lg bg-card">
                <Icons.coins className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Comprar Tokens CBO</h3>
                <p className="text-muted-foreground">
                  Compra tokens Carbono (CBO) con ETH. Estos tokens representan créditos de carbono.
                </p>
              </div>
              <div className="p-6 border rounded-lg bg-card">
                <Icons.image className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Mintear NFTs de Experiencia</h3>
                <p className="text-muted-foreground">Usa tus tokens CBO para mintear NFTs únicos de Experiencia.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Icons.coins className="h-5 w-5" />
                    Balance CBO
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-green-600">
                    {carbonoBalance ? (Number(carbonoBalance) / 1e18).toFixed(2) : "0"}
                  </p>
                  <p className="text-sm text-muted-foreground">Tokens Carbono</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Icons.image className="h-5 w-5" />
                    NFTs Experiencia
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-blue-600">
                    {experienciaBalance ? Number(experienciaBalance).toString() : "0"}
                  </p>
                  <p className="text-sm text-muted-foreground">NFTs en tu wallet</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="buy-carbono" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                <TabsTrigger value="buy-carbono" className="flex items-center gap-2">
                  <Icons.coins className="h-4 w-4" />
                  Comprar CBO
                </TabsTrigger>
                <TabsTrigger value="mint-nft" className="flex items-center gap-2">
                  <Icons.image className="h-4 w-4" />
                  Mintear NFTs
                </TabsTrigger>
              </TabsList>

              <TabsContent value="buy-carbono">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icons.coins className="h-5 w-5" />
                      Comprar Tokens CBO
                    </CardTitle>
                    <CardDescription>
                      Compra tokens Carbono (CBO) con ETH. 
                      {carbonoPrice && (
                        <span className="block mt-1">
                          Precio: {(Number(carbonoPrice) / 1e18).toFixed(6)} ETH por token
                        </span>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Cantidad (CBO)</Label>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="Ingresa la cantidad de CBO a comprar"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        min="0"
                        step="0.01"
                      />
                    </div>

                    {quantity && Number(quantity) > 0 && carbonoPrice && (
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">ETH Requerido:</span>
                          <span className="font-mono font-medium">
                            {((Number(quantity) * Number(carbonoPrice)) / 1e18).toFixed(6)} ETH
                          </span>
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={handleBuy}
                      disabled={!quantity || Number(quantity) <= 0 || isLoading || !carbonoPrice || !isContractConfigured}
                      className="w-full"
                      size="lg"
                    >
                      {!isContractConfigured ? "Contratos no configurados" : isLoading ? "Procesando..." : `Comprar ${quantity || 0} CBO`}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="mint-nft">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icons.image className="h-5 w-5" />
                      Mintear NFT de Experiencia
                    </CardTitle>
                    <CardDescription>
                      Usa tus tokens CBO para mintear un NFT único de Experiencia.
                      {experienciaPrice && (
                        <span className="block mt-1">
                          Costo: {(Number(experienciaPrice) / 1e18).toFixed(2)} CBO por NFT
                        </span>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Costo: {experienciaPrice ? (Number(experienciaPrice) / 1e18).toFixed(2) : "Cargando..."} CBO por NFT
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Tu balance: {carbonoBalance ? (Number(carbonoBalance) / 1e18).toFixed(2) : "0"} CBO
                      </p>
                    </div>

                    <Button
                      onClick={mintExperiencia}
                      disabled={isLoading || !experienciaPrice || !carbonoBalance || Number(carbonoBalance) < Number(experienciaPrice) || !isContractConfigured}
                      className="w-full"
                      size="lg"
                    >
                      {!isContractConfigured ? "Contratos no configurados" : isLoading ? "Minteando..." : "Mintear NFT de Experiencia"}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>

      <footer className="border-t bg-card mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 Carbono & Experiencia. Construido con Next.js y Web3.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
