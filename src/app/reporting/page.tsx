import type { Metadata } from "next"

import { DashboardPlaceholderPage } from "@/components/dashboard/dashboard-placeholder-page"

export const metadata: Metadata = {
  title: "Reporting",
}

export default function ReportingPage() {
  return (
    <DashboardPlaceholderPage
      currentPath="/reporting"
      title="Reporting"
      description="Espace futur pour les analyses ROI, exports et syntheses rapides par periode ou evenement."
      cardTitle="Placeholder V1"
      cardDescription="Les indicateurs detailles et comparaisons seront integres ici."
    />
  )
}
