// app/admin/page.tsx
"use client";
export const dynamic = "force-dynamic";
export const revalidate = 0;

// ... el resto de tus imports y tu componente


import { ConnectButton } from "@rainbow-me/rainbowkit"
import { NetworkChecker } from "@/components/network-checker"
import { Admin } from "@/components/admin"
import { Leaf, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to App
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Leaf className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
                  <p className="text-sm text-muted-foreground">Manage contract settings</p>
                </div>
              </div>
            </div>
            <ConnectButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <NetworkChecker />
        <Admin />
      </main>
    </div>
  )
}
