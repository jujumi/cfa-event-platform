import type { ComponentType } from "react"
import type { Metadata } from "next"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import {
  CalendarDays,
  CircleDollarSign,
  MapPin,
  Plus,
  Search,
  SlidersHorizontal,
  Target,
  Users,
} from "lucide-react"

import { CreateEventDrawer } from "@/components/events/create-event-drawer"
import { createEventRecord, listEvents } from "@/lib/events-store"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  searchParams?: Promise<{ created?: string }>
}) {
  const events = listEvents()
  const params = await searchParams
  const isCreated = params?.created === "1"

  async function createEvent(formData: FormData) {
    "use server"

    const startDate = new Date(getRequiredString(formData, "startDate"))
    const durationDays = getOptionalNumber(formData, "durationDays") ?? 1
    const endDate = computeEndDate(startDate, durationDays)

    createEventRecord({
      title: getRequiredString(formData, "title"),
      eventType: getEnumValue(formData, "eventType", eventTypeOptions.map((option) => option.value)),
      cfaScope: getEnumValue(formData, "cfaScope", cfaScopeOptions.map((option) => option.value)),
      status: getEnumValue(formData, "status", statusOptions.map((option) => option.value)),
      startDate,
      durationDays,
      endDate,
      location: getOptionalString(formData, "location"),
      owner: null,
      priority: "MEDIUM",
      mainGoal: null,
      notes: getOptionalString(formData, "notes"),
      budgetEstimated: getOptionalNumber(formData, "budgetEstimated"),
      budgetNotes: getOptionalString(formData, "budgetNotes"),
      participantsIfir: getOptionalInteger(formData, "participantsIfir"),
      participantsSport: getOptionalInteger(formData, "participantsSport"),
      reportStatus: "PAS_FAIT",
    })

    revalidatePath("/evenements")
    redirect("/evenements?created=1")
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f7f3_0%,#f3f4ef_26%,#eef1ea_100%)] text-foreground">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <Card className="border border-border/60 bg-white/90 shadow-none">
          <CardHeader className="gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <CardTitle className="text-2xl font-semibold tracking-tight">Evenements</CardTitle>
              <CardDescription className="mt-1">
                Vue de gestion dense pour creer, qualifier et suivre les evenements de la saison.
              </CardDescription>
            </div>
            <CreateEventDrawer
              action={createEvent}
              eventTypeOptions={eventTypeOptions}
              cfaScopeOptions={cfaScopeOptions}
              statusOptions={statusOptions}
            />
          </CardHeader>
        </Card>

        {isCreated ? (
          <Card className="border border-emerald-200 bg-emerald-50/80 shadow-none">
            <CardContent className="py-4 text-sm text-emerald-900">
              Evenement cree avec succes.
            </CardContent>
          </Card>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
            <Card className="border border-border/60 bg-white/90 shadow-none">
              <CardHeader className="gap-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-base">Pilotage de la liste</CardTitle>
                    <CardDescription>Recherche et filtres a brancher dans une prochaine iteration.</CardDescription>
                  </div>
                  <div className="inline-flex rounded-2xl bg-muted p-1 text-sm">
                    <span className="rounded-xl bg-white px-3 py-1.5 font-medium text-foreground shadow-sm">
                      Liste
                    </span>
                    <span className="px-3 py-1.5 text-muted-foreground">Calendrier</span>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_180px_180px_180px]">
                  <div className="relative">
                    <Search className="pointer-events-none absolute top-2.5 left-3 size-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher un titre, lieu ou objectif"
                      className="pl-9"
                      disabled
                    />
                  </div>
                  <Input value="Tous les statuts" disabled />
                  <Input value="Tous les CFA" disabled />
                  <Button variant="outline" className="justify-start">
                    <SlidersHorizontal className="size-4" />
                    Filtres a venir
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {events.length === 0 ? (
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
                        <TableHead>Evenement</TableHead>
                        <TableHead>Periode</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>CFA</TableHead>
                        <TableHead>Lieu</TableHead>
                        <TableHead>Budget</TableHead>
                        <TableHead>Participants</TableHead>
                        <TableHead>Bilan</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {events.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell className="min-w-[240px] align-top">
                            <div className="space-y-2">
                              <div className="font-medium">{event.title}</div>
                              <div className="flex flex-wrap gap-2">
                                <Badge>{formatEventType(event.eventType)}</Badge>
                              </div>
                              {event.notes ? (
                                <p className="line-clamp-2 max-w-md text-sm text-muted-foreground">
                                  {event.notes}
                                </p>
                              ) : null}
                            </div>
                          </TableCell>
                          <TableCell className="align-top text-sm">
                            <div>{formatSingleDate(event.startDate)}</div>
                            <div className="text-muted-foreground">
                              {formatDurationDays(event.durationDays)}
                            </div>
                          </TableCell>
                          <TableCell className="align-top">
                            <Badge variant="secondary">{formatStatus(event.status)}</Badge>
                          </TableCell>
                          <TableCell className="align-top">
                            <Badge variant="outline">{formatCfaScope(event.cfaScope)}</Badge>
                          </TableCell>
                          <TableCell className="align-top text-sm text-muted-foreground">
                            {event.location ?? "Non renseigne"}
                          </TableCell>
                          <TableCell className="align-top text-sm">
                            <div>{formatBudget(event.budgetEstimated)}</div>
                            <div className="text-muted-foreground">
                              {event.budgetNotes ?? "Sans note budget"}
                            </div>
                          </TableCell>
                          <TableCell className="align-top text-sm">
                            <div>IFIR : {event.participantsIfir ?? "-"}</div>
                            <div className="text-muted-foreground">
                              Sport : {event.participantsSport ?? "-"}
                            </div>
                          </TableCell>
                          <TableCell className="align-top">
                            <Badge variant="outline">{formatReportStatus(event.reportStatus)}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            <Card className="border border-border/60 bg-white/90 shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <CalendarDays className="size-4" />
                  Calendrier
                </CardTitle>
                <CardDescription>
                  Placeholder calendrier : une vue mensuelle ou chronologique sera ajoutee plus tard.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-[24px] border border-dashed border-border/70 bg-muted/20 p-8">
                  <p className="text-sm text-muted-foreground">
                    Cette zone affichera prochainement un calendrier de la saison, avec regroupement
                    par semaine et alertes de preparation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-6">
            <Card className="border border-border/60 bg-white/90 shadow-none">
              <CardHeader>
                <CardTitle className="text-base">Vue d'ensemble</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <StatLine label="Total evenements" value={String(events.length)} />
                <StatLine
                  label="A preparer"
                  value={String(events.filter((event) => event.status === "A_PREPARER").length)}
                />
                <StatLine
                  label="Bilans faits"
                  value={String(events.filter((event) => event.reportStatus === "FAIT").length)}
                />
              </CardContent>
            </Card>

            <Card className="border border-border/60 bg-white/90 shadow-none">
              <CardHeader>
                <CardTitle className="text-base">Champs suivis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <InfoPill icon={CircleDollarSign} text="Budget et note budget" />
                <InfoPill icon={Users} text="Participants IFIR / Sport" />
                <InfoPill icon={Target} text="Bilan simple : Pas fait, En cours, Fait" />
                <InfoPill icon={MapPin} text="Lieu et periode de l'evenement" />
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}

function StatLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-muted/25 px-3 py-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}

function InfoPill({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl bg-muted/25 px-3 py-2">
      <Icon className="size-4" />
      <span>{text}</span>
    </div>
  )
}

function getRequiredString(formData: FormData, key: string) {
  const value = formData.get(key)

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Missing required field: ${key}`)
  }

  return value.trim()
}

function getOptionalString(formData: FormData, key: string) {
  const value = formData.get(key)

  if (typeof value !== "string") {
    return null
  }

  const trimmedValue = value.trim()
  return trimmedValue.length > 0 ? trimmedValue : null
}

function getOptionalNumber(formData: FormData, key: string) {
  const value = getOptionalString(formData, key)

  if (!value) {
    return null
  }

  const parsedValue = Number(value)
  return Number.isFinite(parsedValue) ? parsedValue : null
}

function getOptionalInteger(formData: FormData, key: string) {
  const value = getOptionalNumber(formData, key)
  return value === null ? null : Math.trunc(value)
}

function getEnumValue<T extends string>(
  formData: FormData,
  key: string,
  allowedValues: readonly T[]
) {
  const value = getRequiredString(formData, key)

  if (!allowedValues.includes(value as T)) {
    throw new Error(`Invalid enum value for field: ${key}`)
  }

  return value as T
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

function computeEndDate(startDate: Date, durationDays: number) {
  if (durationDays <= 1) {
    return null
  }

  const endDate = new Date(startDate)
  endDate.setDate(endDate.getDate() + Math.ceil(durationDays) - 1)
  return endDate
}
