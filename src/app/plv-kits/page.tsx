import type { Metadata } from "next"

import { DashboardPlaceholderPage } from "@/components/dashboard/dashboard-placeholder-page"

export const metadata: Metadata = {
  title: "PLV / Kits",
}

export default function PlvKitsPage() {
  return (
    <DashboardPlaceholderPage
      currentPath="/plv-kits"
      title="PLV / Kits"
      description="Zone reservee au suivi des supports, kits communication et materiels terrain."
      cardTitle="Placeholder V1"
      cardDescription="L'inventaire, les quantites et l'etat des supports seront structures ici."
    />
  )
}
