import type { Metadata } from "next"

import { DashboardPlaceholderPage } from "@/components/dashboard/dashboard-placeholder-page"

export const metadata: Metadata = {
  title: "Landing pages",
}

export default function LandingPagesPage() {
  return (
    <DashboardPlaceholderPage
      currentPath="/landing-pages"
      title="Landing pages"
      description="Section prevue pour les pages publiques et formulaires associes aux actions evenementielles."
      cardTitle="Placeholder V1"
      cardDescription="La liste des pages, leur statut et les formulaires publies prendront place ici."
    />
  )
}
