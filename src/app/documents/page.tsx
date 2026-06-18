import type { Metadata } from "next"

import { DashboardPlaceholderPage } from "@/components/dashboard/dashboard-placeholder-page"

export const metadata: Metadata = {
  title: "Documents",
}

export default function DocumentsPage() {
  return (
    <DashboardPlaceholderPage
      currentPath="/documents"
      title="Documents"
      description="Espace prevu pour centraliser devis, factures, supports et bilans lies aux evenements."
      cardTitle="Placeholder V1"
      cardDescription="Le classement documentaire simple par evenement sera ajoute ici."
    />
  )
}
