import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type React from "react"

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  description?: string
  loading?: boolean
}

export function StatCard({ title, value, icon: Icon, description, loading }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading ? <div className="h-8 w-20 bg-muted animate-pulse rounded" /> : value}
        </div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  )
}
