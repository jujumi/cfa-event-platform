"use client"

import { ChevronRight } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type PlaceholderPageProps = {
  currentPath?: string
  title: string
  description: string
  cardTitle: string
  cardDescription: string
}

export function DashboardPlaceholderPage({
  currentPath: _currentPath,
  title,
  description,
  cardTitle,
  cardDescription,
}: PlaceholderPageProps) {
  return (
    <>
      <Card className="border border-border/60 bg-white/90 shadow-none">
        <CardHeader>
          <CardTitle>{cardTitle}</CardTitle>
          <CardDescription>{cardDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-[24px] border border-dashed border-border/70 bg-muted/20 p-6">
            <p className="text-sm text-muted-foreground">
              Cette page servira de base pour la V1. Le contenu reste statique tant que
              les flux, tables et actions metier ne sont pas branches.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-secondary px-3 py-2 text-sm">
              <span>Prochaine etape</span>
              <ChevronRight className="size-4" />
              <span>connecter les vrais blocs du module</span>
            </div>
          </div>
        </CardContent>
      </Card>

    </>
  )
}
