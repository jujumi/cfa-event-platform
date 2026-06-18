import type { Metadata } from "next"

import { DashboardPlaceholderPage } from "@/components/dashboard/dashboard-placeholder-page"

export const metadata: Metadata = {
  title: "Leads",
}

export default function LeadsPage() {
  return (
    <DashboardPlaceholderPage
      currentPath="/leads"
      title="Leads"
      description="Page placeholder pour la collecte, la qualification et les relances prospects."
      cardTitle="Placeholder V1"
      cardDescription="Le suivi des statuts, actions attendues et prochaines relances sera ajoute ici."
    />
  )
}
