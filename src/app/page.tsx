import type { Metadata } from "next";

import { PilotageDashboard } from "@/components/dashboard/pilotage-dashboard";

export const metadata: Metadata = {
  title: "Pilotage evenements",
};

export default function Home() {
  return <PilotageDashboard />;
}
