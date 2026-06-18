export const eventTypeOptions = [
  { value: "SALON", label: "Salon" },
  { value: "JPO", label: "JPO" },
  { value: "FORUM", label: "Forum" },
  { value: "WEBINAIRE", label: "Webinaire" },
  { value: "PARTENAIRE", label: "Evenement partenaire" },
  { value: "INTERNE", label: "Evenement interne" },
  { value: "AUTRE", label: "Autre" },
] as const

export const cfaScopeOptions = [
  { value: "IFIR", label: "IFIR" },
  { value: "SPORT", label: "Sport" },
  { value: "BOTH", label: "IFIR + Sport" },
] as const

export const statusOptions = [
  { value: "VEILLE", label: "Veille" },
  { value: "A_ARBITRER", label: "A arbitrer" },
  { value: "DEVIS_DEMANDE", label: "Devis demande" },
  { value: "DEVIS_RECU", label: "Devis recu" },
  { value: "VALIDE", label: "Valide" },
  { value: "INSCRIT", label: "Inscrit" },
  { value: "A_PREPARER", label: "A preparer" },
  { value: "TERMINE", label: "Termine" },
  { value: "BILAN_A_FAIRE", label: "Bilan a faire" },
] as const
