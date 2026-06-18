export type DashboardKpiIcon =
  | "alert-circle"
  | "calendar-days"
  | "flag"
  | "users"

export type DashboardKpi = {
  label: string
  value: string
  note: string
  icon: DashboardKpiIcon
}

export type DashboardPriorityAction = {
  title: string
  detail: string
  badge: string
}

export type DashboardPipelineItem = {
  name: string
  meta: string
  tag: string
}

export type DashboardPipelineColumn = {
  status: string
  items: DashboardPipelineItem[]
}

export type DashboardUpcomingEvent = {
  date: string
  event: string
  type: string
  location: string
  status: string
  owner: string
  nextAction: string
}

export type DashboardTraining = {
  name: string
  cfa: string
  tag: string
  note: string
}

export type DashboardMetric = {
  label: string
  value: string
}

export type DashboardLeadCollection = {
  metrics: DashboardMetric[]
  conversionSummary: string
  conversionSteps: string[]
}

export type DashboardRoiMetric = {
  label: string
  value: string
  helper: string
}

export type DashboardSpendSplitItem = {
  label: string
  value: number
}

export const dashboardKpis: DashboardKpi[] = [
  {
    label: "Evenements a arbitrer",
    value: "6",
    note: "2 decisions budget cette semaine",
    icon: "alert-circle",
  },
  {
    label: "Actions urgentes",
    value: "14",
    note: "Devis, briefs equipe, formulaires",
    icon: "flag",
  },
  {
    label: "Salons valides",
    value: "18",
    note: "5 avec kit communication complet",
    icon: "calendar-days",
  },
  {
    label: "Leads a relancer",
    value: "42",
    note: "Fenetre ideale sous 72h",
    icon: "users",
  },
]

export const dashboardPriorityActions: DashboardPriorityAction[] = [
  {
    title: "Salon Orientation Lyon",
    detail: "Devis stand en attente depuis 4 jours",
    badge: "Devis",
  },
  {
    title: "JPO IFIR - Villeurbanne",
    detail: "Landing page publiee, formulaire a verifier avant diffusion",
    badge: "Formulaire",
  },
  {
    title: "Forum Sport Sante",
    detail: "Brief equipe incomplet et aucun objectif formalise",
    badge: "Preparation",
  },
  {
    title: "Webinaire reconversion",
    detail: "Bilan post-evenement non rempli, ROI non partage",
    badge: "Bilan",
  },
]

export const dashboardPipeline: DashboardPipelineColumn[] = [
  {
    status: "Veille",
    items: [
      { name: "Salon AURA Alternance", meta: "12 sept. - Lyon", tag: "Sport" },
      { name: "Forum RH Industrie", meta: "24 sept. - Grenoble", tag: "IFIR" },
    ],
  },
  {
    status: "A arbitrer",
    items: [
      { name: "Salon Studyrama", meta: "03 oct. - Annecy", tag: "Budget" },
      { name: "JPO CFA Sport", meta: "11 oct. - Voiron", tag: "Priorite" },
    ],
  },
  {
    status: "Valide",
    items: [
      { name: "Nuit de l'Orientation", meta: "17 oct. - Lyon", tag: "IFIR + Sport" },
      { name: "Forum Apprentissage", meta: "06 nov. - Bourgoin", tag: "Equipe ok" },
    ],
  },
  {
    status: "A preparer",
    items: [
      { name: "JPO IFIR", meta: "22 nov. - Villeurbanne", tag: "PLV a verifier" },
      { name: "Salon Etudiant", meta: "29 nov. - Chambery", tag: "Brief a finaliser" },
    ],
  },
  {
    status: "Termine",
    items: [
      { name: "Webinaire BTS NDRC", meta: "05 juin - Distanciel", tag: "Bilan a faire" },
      { name: "Forum des metiers", meta: "12 juin - Saint-Etienne", tag: "ROI partage" },
    ],
  },
]

export const dashboardUpcomingEvents: DashboardUpcomingEvent[] = [
  {
    date: "22 nov.",
    event: "JPO IFIR",
    type: "JPO",
    location: "Villeurbanne",
    status: "A preparer",
    owner: "Alice M.",
    nextAction: "Valider le brief equipe",
  },
  {
    date: "29 nov.",
    event: "Salon Etudiant",
    type: "Salon",
    location: "Chambery",
    status: "Valide",
    owner: "Nora R.",
    nextAction: "Confirmer les supports PLV",
  },
  {
    date: "06 dec.",
    event: "Forum Apprentissage",
    type: "Forum",
    location: "Bourgoin",
    status: "Valide",
    owner: "Theo C.",
    nextAction: "Publier la landing page",
  },
  {
    date: "12 dec.",
    event: "Webinaire reconversion",
    type: "Webinaire",
    location: "Distanciel",
    status: "A arbitrer",
    owner: "Sonia P.",
    nextAction: "Arbitrer le ciblage CFA",
  },
]

export const dashboardPriorityTrainings: DashboardTraining[] = [
  {
    name: "BTS NDRC",
    cfa: "IFIR",
    tag: "A remplir",
    note: "Bon taux d'insertion et besoin de volume avant janvier.",
  },
  {
    name: "BPJEPS APT",
    cfa: "Sport",
    tag: "Priorite rentree",
    note: "Tres bon fit pour les salons orientation grand public.",
  },
  {
    name: "Bachelor RH",
    cfa: "IFIR",
    tag: "Besoin employeur",
    note: "Argument marche fort pour les forums alternance.",
  },
]

export const dashboardLeadCollection: DashboardLeadCollection = {
  metrics: [
    { label: "Landing pages publiees", value: "8" },
    { label: "Formulaires actifs", value: "11" },
    { label: "Scans QR", value: "326" },
    { label: "Leads collectes", value: "214" },
    { label: "Demandes de rappel", value: "57" },
    { label: "Inscriptions JPO", value: "34" },
  ],
  conversionSummary: "326 scans QR → 214 leads → 57 rappels → 34 inscriptions JPO",
  conversionSteps: ["Visibilite", "Scans QR", "Leads", "Rappels", "JPO", "Candidatures"],
}

export const dashboardRoiMetrics: DashboardRoiMetric[] = [
  { label: "Cout total periode", value: "12 480 EUR", helper: "salons, PLV, deplacements" },
  { label: "Leads generes", value: "214", helper: "dont 68 qualifies" },
  { label: "Taux de conversion", value: "15,9 %", helper: "vers JPO ou rappel" },
  { label: "Cout par lead", value: "58 EUR", helper: "objectif < 65 EUR" },
]

export const dashboardSpendSplit: DashboardSpendSplitItem[] = [
  { label: "Salons", value: 46 },
  { label: "JPO", value: 28 },
  { label: "Webinaires", value: 14 },
  { label: "Supports", value: 12 },
]
