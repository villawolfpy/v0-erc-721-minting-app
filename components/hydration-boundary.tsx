"use client"

import { useEffect, useState } from "react"

interface HydrationBoundaryProps {
  children: React.ReactNode
}

export default function HydrationBoundary({ children }: HydrationBoundaryProps) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Pequeño delay para asegurar que todo esté hidratado
    const timer = setTimeout(() => {
      setIsHydrated(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-16 w-16 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto">
            🌱
          </div>
          <h1 className="text-3xl font-bold">Carbono & Experiencia</h1>
          <p className="text-muted-foreground">Inicializando aplicación...</p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
