import type { Metadata } from "next"
import Link from "next/link"
import {
  CalendarDays,
  Search,
  SlidersHorizontal,
} from "lucide-react"

import { listEvents } from "@/lib/events-store"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Evenements",
}

export const dynamic = "force-dynamic"

const eventTypeOptions = [
  { value: "SALON", label: "Salon" },
  { value: "JPO", label: "JPO" },
  { value: "FORUM", label: "Forum" },
  { value: "WEBINAIRE", label: "Webinaire" },
  { value: "PARTENAIRE", label: "Evenement partenaire" },
  { value: "INTERNE", label: "Evenement interne" },
  { value: "AUTRE", label: "Autre" },
] as const

const cfaScopeOptions = [
  { value: "IFIR", label: "IFIR" },
  { value: "SPORT", label: "Sport" },
  { value: "BOTH", label: "IFIR + Sport" },
] as const

const statusOptions = [
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

const reportStatusOptions = [
  { value: "PAS_FAIT", label: "Pas fait" },
  { value: "EN_COURS", label: "En cours" },
  { value: "FAIT", label: "Fait" },
] as const

export default async function EvenementsPage({
  searchParams,
}: {
  searchParams?: Promise<{ created?: string; view?: string }>
}) {
  const events = listEvents()
  const params = await searchParams
  const isCreated = params?.created === "1"
  const currentView = params?.view === "calendar" ? "calendar" : "list"
  const createdSuffix = isCreated ? "&created=1" : ""

  return (
    <>
      {isCreated ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 px-4 py-3 text-sm text-emerald-900">
          Evenement cree avec succes.
        </div>
      ) : null}

      <Card className="border border-border/60 bg-white/90 shadow-none">
        <CardHeader className="gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base">Pilotage de la liste</CardTitle>
              <CardDescription>Recherche et filtres a brancher dans une prochaine iteration.</CardDescription>
            </div>
            <div className="inline-flex rounded-2xl bg-muted p-1 text-sm">
              <Link
                href={`/evenements?view=list${createdSuffix}`}
                className={`rounded-xl px-3 py-1.5 ${currentView === "list" ? "bg-white font-medium text-foreground shadow-sm" : "text-muted-foreground"}`}
              >
                Liste
              </Link>
              <Link
                href={`/evenements?view=calendar${createdSuffix}`}
                className={`rounded-xl px-3 py-1.5 ${currentView === "calendar" ? "bg-white font-medium text-foreground shadow-sm" : "text-muted-foreground"}`}
              >
                Calendrier
              </Link>
            </div>
          </div>

          <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_150px_150px_170px_160px_170px]">
            <div className="relative">
              <Search className="pointer-events-none absolute top-2.5 left-3 size-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un titre, lieu ou objectif"
                className="pl-9"
                disabled
              />
            </div>
            <Input value="Tous les CFA" disabled />
            <Input value="Tous les types" disabled />
            <Input value="Toutes decisions" disabled />
            <Input value="Toute periode" disabled />
            <Input value="Tous les bilans" disabled />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="justify-start">
              <SlidersHorizontal className="size-4" />
              Filtres a venir
            </Button>
            <div className="rounded-2xl bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
              Recherche, CFA, type, decision, periode et bilan seront relies ensuite.
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {currentView === "calendar" ? (
            <div className="rounded-[24px] border border-dashed border-border/70 bg-muted/20 p-10">
              <div className="flex items-center gap-2 text-sm font-medium">
                <CalendarDays className="size-4" />
                Vue calendrier
              </div>
              <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
                Cette vue affichera la saison par mois, les evenements proches et les alertes de
                preparation. Elle remplace la table quand l&apos;onglet calendrier est actif.
              </p>
            </div>
          ) : events.length === 0 ? (
            <div className="rounded-[24px] border border-dashed border-border/70 bg-muted/20 p-10 text-center">
              <p className="text-base font-medium">Aucun evenement enregistre</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Utilise l'action `Nouvel evenement` pour demarrer la saison dans l'outil.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[26%]">Evenement</TableHead>
                  <TableHead>CFA</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Decision</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-[18%]">Lieu / adresse</TableHead>
                  <TableHead className="w-[12%]">Participants</TableHead>
                  <TableHead className="w-[14%]">Budget</TableHead>
                  <TableHead>Bilan</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="min-w-[260px] align-top">
                      <div className="space-y-2">
                        <div className="font-medium">{event.title}</div>
                        {event.notes ? (
                          <p className="line-clamp-2 max-w-md text-sm text-muted-foreground">
                            {event.notes}
                          </p>
                        ) : (
                          <p className="text-sm text-muted-foreground">Sans note interne</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="align-top">
                      <Badge variant="outline">{formatCfaScope(event.cfaScope)}</Badge>
                    </TableCell>
                    <TableCell className="align-top">
                      <Badge>{formatEventType(event.eventType)}</Badge>
                    </TableCell>
                    <TableCell className="align-top">
                      <Badge variant="secondary">{formatStatus(event.status)}</Badge>
                    </TableCell>
                    <TableCell className="align-top">
                      <div className="flex flex-wrap gap-2">
                        {getDecisionStatusChips(event.status).map((chip) => (
                          <Badge key={chip} variant="outline" className="text-xs">
                            {chip}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="align-top text-sm">
                      <div>{formatSingleDate(event.startDate)}</div>
                      <div className="text-muted-foreground">
                        {formatDurationDays(event.durationDays)}
                      </div>
                    </TableCell>
                    <TableCell className="align-top text-sm text-muted-foreground">
                      {event.location ?? "Non renseigne"}
                    </TableCell>
                    <TableCell className="align-top text-sm">
                      <div className="font-medium">IFIR : {event.participantsIfir ?? "-"}</div>
                      <div className="text-muted-foreground">
                        CFA Sport : {event.participantsSport ?? "-"}
                      </div>
                    </TableCell>
                    <TableCell className="align-top text-sm">
                      <div className="font-medium">{formatBudget(event.budgetEstimated)}</div>
                      <div className="text-muted-foreground">
                        {event.budgetNotes ?? "Sans note budget"}
                      </div>
                    </TableCell>
                    <TableCell className="align-top">
                      <Badge variant="outline">{formatReportStatus(event.reportStatus)}</Badge>
                    </TableCell>
                    <TableCell className="align-top text-right">
                      <Link
                        href={`/evenements/${event.id}`}
                        className={buttonVariants({ variant: "outline", size: "sm" })}
                      >
                        Voir fiche
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </>
  )
}

function formatSingleDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date)
}

function formatEventType(value: string) {
  return eventTypeOptions.find((option) => option.value === value)?.label ?? value
}

function formatCfaScope(value: string) {
  return cfaScopeOptions.find((option) => option.value === value)?.label ?? value
}

function formatStatus(value: string) {
  return statusOptions.find((option) => option.value === value)?.label ?? value
}

function formatReportStatus(value: string) {
  return reportStatusOptions.find((option) => option.value === value)?.label ?? value
}

function getDecisionStatusChips(status: string) {
  switch (status) {
    case "A_ARBITRER":
      return ["A arbitrer"]
    case "DEVIS_DEMANDE":
    case "DEVIS_RECU":
      return ["En attente"]
    case "VALIDE":
    case "INSCRIT":
    case "A_PREPARER":
      return ["A faire"]
    case "TERMINE":
      return ["Traite"]
    case "BILAN_A_FAIRE":
      return ["A revoir"]
    default:
      return ["En veille"]
  }
}

function formatDurationDays(value: number | null) {
  if (!value) {
    return "1 jour"
  }

  return `${String(value).replace(".", ",")} jour${value > 1 ? "s" : ""}`
}

function formatBudget(value: number | null) {
  if (value === null) {
    return "Non renseigne"
  }

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value)
}
