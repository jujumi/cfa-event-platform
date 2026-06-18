import type { ComponentType, ReactNode } from "react"
import type { Metadata } from "next"
import { revalidatePath } from "next/cache"
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
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"

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

export default async function EvenementsPage() {
  const events = listEvents()

  async function createEvent(formData: FormData) {
    "use server"

    createEventRecord({
      title: getRequiredString(formData, "title"),
      eventType: getEnumValue(formData, "eventType", eventTypeOptions.map((option) => option.value)),
      cfaScope: getEnumValue(formData, "cfaScope", cfaScopeOptions.map((option) => option.value)),
      status: getEnumValue(formData, "status", statusOptions.map((option) => option.value)),
      startDate: new Date(getRequiredString(formData, "startDate")),
      endDate: getOptionalDate(formData, "endDate"),
      location: getOptionalString(formData, "location"),
      owner: null,
      priority: "MEDIUM",
      mainGoal: getOptionalString(formData, "mainGoal"),
      notes: getOptionalString(formData, "notes"),
      budgetEstimated: getOptionalNumber(formData, "budgetEstimated"),
      budgetNotes: getOptionalString(formData, "budgetNotes"),
      participantsIfir: getOptionalInteger(formData, "participantsIfir"),
      participantsSport: getOptionalInteger(formData, "participantsSport"),
      reportStatus: getEnumValue(
        formData,
        "reportStatus",
        reportStatusOptions.map((option) => option.value)
      ),
    })

    revalidatePath("/evenements")
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
            <CreateEventDrawer action={createEvent} />
          </CardHeader>
        </Card>

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
                                {event.mainGoal ? <Badge variant="outline">{event.mainGoal}</Badge> : null}
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
                              {event.endDate ? formatSingleDate(event.endDate) : "Date unique"}
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

function CreateEventDrawer({
  action,
}: {
  action: (formData: FormData) => Promise<void>
}) {
  return (
    <Sheet>
      <SheetTrigger render={<Button className="w-full sm:w-auto" />}>
        <Plus className="size-4" />
        Nouvel evenement
      </SheetTrigger>
      <SheetContent side="right" className="w-full overflow-y-auto p-0 sm:max-w-xl">
        <div className="border-b border-border/60 p-6">
          <SheetTitle>Nouvel evenement</SheetTitle>
          <SheetDescription>
            Saisie rapide pour alimenter la vue de gestion sans alourdir le parcours.
          </SheetDescription>
        </div>

        <form action={action} className="space-y-5 p-6">
          <FormField label="Titre" htmlFor="title" required>
            <Input id="title" name="title" placeholder="Ex. Salon Etudiant Lyon" required />
          </FormField>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Type" htmlFor="eventType" required>
              <select
                id="eventType"
                name="eventType"
                defaultValue="SALON"
                className={selectClassName}
                required
              >
                {eventTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="CFA" htmlFor="cfaScope" required>
              <select
                id="cfaScope"
                name="cfaScope"
                defaultValue="BOTH"
                className={selectClassName}
                required
              >
                {cfaScopeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </FormField>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Statut" htmlFor="status" required>
              <select
                id="status"
                name="status"
                defaultValue="VEILLE"
                className={selectClassName}
                required
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Bilan" htmlFor="reportStatus" required>
              <select
                id="reportStatus"
                name="reportStatus"
                defaultValue="PAS_FAIT"
                className={selectClassName}
                required
              >
                {reportStatusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </FormField>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Date debut" htmlFor="startDate" required>
              <Input id="startDate" name="startDate" type="date" required />
            </FormField>

            <FormField label="Date fin" htmlFor="endDate">
              <Input id="endDate" name="endDate" type="date" />
            </FormField>
          </div>

          <FormField label="Lieu" htmlFor="location">
            <Input id="location" name="location" placeholder="Ex. Lyon" />
          </FormField>

          <FormField label="Objectif principal" htmlFor="mainGoal">
            <Input
              id="mainGoal"
              name="mainGoal"
              placeholder="Ex. Generer des leads BTS NDRC"
            />
          </FormField>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Budget estime" htmlFor="budgetEstimated">
              <Input id="budgetEstimated" name="budgetEstimated" type="number" min="0" step="0.01" />
            </FormField>

            <FormField label="Note budget" htmlFor="budgetNotes">
              <Input
                id="budgetNotes"
                name="budgetNotes"
                placeholder="Ex. devis stand a confirmer"
              />
            </FormField>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Participants IFIR" htmlFor="participantsIfir">
              <Input id="participantsIfir" name="participantsIfir" type="number" min="0" step="1" />
            </FormField>

            <FormField label="Participants CFA Sport" htmlFor="participantsSport">
              <Input id="participantsSport" name="participantsSport" type="number" min="0" step="1" />
            </FormField>
          </div>

          <FormField label="Notes" htmlFor="notes">
            <Textarea
              id="notes"
              name="notes"
              placeholder="Points utiles, contexte, remarques terrain."
            />
          </FormField>

          <Button type="submit" className="w-full">
            Enregistrer l'evenement
          </Button>
        </form>
      </SheetContent>
    </Sheet>
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

function InfoPill({
  icon: Icon,
  text,
}: {
  icon: ComponentType<{ className?: string }>
  text: string
}) {
  return (
    <div className="flex items-center gap-2 rounded-2xl bg-muted/25 px-3 py-2">
      <Icon className="size-4" />
      <span>{text}</span>
    </div>
  )
}

function FormField({
  label,
  htmlFor,
  required = false,
  children,
}: {
  label: string
  htmlFor: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>
        {label}
        {required ? <span className="text-muted-foreground">*</span> : null}
      </Label>
      {children}
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

function getOptionalDate(formData: FormData, key: string) {
  const value = getOptionalString(formData, key)
  return value ? new Date(value) : null
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

const selectClassName =
  "flex h-8 w-full rounded-2xl border border-transparent bg-input/50 px-2.5 py-1 text-sm transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
