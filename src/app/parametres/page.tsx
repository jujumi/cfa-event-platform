import type { Metadata } from "next"

import { DashboardPlaceholderPage } from "@/components/dashboard/dashboard-placeholder-page"

export const metadata: Metadata = {
  title: "Parametres",
}

export default function ParametresPage() {
  return (
    <DashboardPlaceholderPage
      currentPath="/parametres"
      title="Parametres"
      description="Page reservee aux reglages fonctionnels simples du MVP et aux preferences de pilotage."
      cardTitle="Placeholder V1"
      cardDescription="Les options generales, listes de reference et reglages de saison seront ajoutes ici."
    />
  )
}
