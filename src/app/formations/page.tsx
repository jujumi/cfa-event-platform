import type { Metadata } from "next"

import { DashboardPlaceholderPage } from "@/components/dashboard/dashboard-placeholder-page"

export const metadata: Metadata = {
  title: "Formations",
}

export default function FormationsPage() {
  return (
    <DashboardPlaceholderPage
      currentPath="/formations"
      title="Formations"
      description="Module destine a prioriser les formations a pousser selon les besoins de recrutement."
      cardTitle="Placeholder V1"
      cardDescription="Les messages cles, secteurs et priorites de remplissage seront visibles ici."
    />
  )
}
