import type { Metadata } from "next"

import { DashboardPlaceholderPage } from "@/components/dashboard/dashboard-placeholder-page"

export const metadata: Metadata = {
  title: "Aide",
}

export default function AidePage() {
  return (
    <DashboardPlaceholderPage
      currentPath="/aide"
      title="Aide"
      description="Point d'entree placeholder pour la documentation interne et les consignes d'usage."
      cardTitle="Placeholder V1"
      cardDescription="Les guides rapides, definitions de statuts et FAQ du pilotage seront ajoutes ici."
    />
  )
}
