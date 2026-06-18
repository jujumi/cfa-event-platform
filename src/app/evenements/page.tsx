import type { ComponentType, ReactNode } from "react"
import type { Metadata } from "next"
import { revalidatePath } from "next/cache"
import {
  CalendarDays,
  MapPin,
  Plus,
  Target,
  User,
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

const priorityOptions = [
  { value: "LOW", label: "Basse" },
  { value: "MEDIUM", label: "Moyenne" },
  { value: "HIGH", label: "Haute" },
  { value: "URGENT", label: "Urgente" },
] as const

export default async function EvenementsPage() {
  const events = listEvents()

  async function createEvent(formData: FormData) {
    "use server"

    const title = getRequiredString(formData, "title")
    const startDate = getRequiredString(formData, "startDate")

    createEventRecord({
      title,
      eventType: getEnumValue(formData, "eventType", eventTypeOptions.map((option) => option.value)),
      cfaScope: getEnumValue(formData, "cfaScope", cfaScopeOptions.map((option) => option.value)),
      status: getEnumValue(formData, "status", statusOptions.map((option) => option.value)),
      startDate: new Date(startDate),
      endDate: getOptionalDate(formData, "endDate"),
      location: getOptionalString(formData, "location"),
      owner: getOptionalString(formData, "owner"),
      priority: getEnumValue(formData, "priority", priorityOptions.map((option) => option.value)),
      mainGoal: getOptionalString(formData, "mainGoal"),
      notes: getOptionalString(formData, "notes"),
    })

    revalidatePath("/evenements")
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f7f3_0%,#f3f4ef_26%,#eef1ea_100%)] text-foreground">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <Card className="border border-border/60 bg-white/90 shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold tracking-tight">Evenements</CardTitle>
            <CardDescription>
              Premier module V1 pour creer et suivre les evenements directement dans la plateforme.
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
          <Card className="border border-border/60 bg-white/90 shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="size-4" />
                Creer un evenement
              </CardTitle>
              <CardDescription>
                Saisie minimale pour alimenter la base locale SQLite et lancer le suivi.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={createEvent} className="space-y-4">
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

                  <FormField label="Priorite" htmlFor="priority" required>
                    <select
                      id="priority"
                      name="priority"
                      defaultValue="MEDIUM"
                      className={selectClassName}
                      required
                    >
                      {priorityOptions.map((option) => (
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

                <FormField label="Responsable" htmlFor="owner">
                  <Input id="owner" name="owner" placeholder="Ex. Alice Martin" />
                </FormField>

                <FormField label="Objectif principal" htmlFor="mainGoal">
                  <Input
                    id="mainGoal"
                    name="mainGoal"
                    placeholder="Ex. Generer des leads BTS NDRC"
                  />
                </FormField>

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
            </CardContent>
          </Card>

          <Card className="border border-border/60 bg-white/90 shadow-none">
            <CardHeader>
              <CardTitle>Liste des evenements</CardTitle>
              <CardDescription>
                Vue simple des evenements enregistres localement dans la base SQLite.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {events.length === 0 ? (
                <div className="rounded-[24px] border border-dashed border-border/70 bg-muted/20 p-8 text-center">
                  <p className="text-base font-medium">Aucun evenement enregistre</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Cree le premier evenement pour commencer le pilotage dans l'outil.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="rounded-[24px] border border-border/60 bg-muted/20 p-5"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h2 className="text-lg font-semibold">{event.title}</h2>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <Badge>{formatEventType(event.eventType)}</Badge>
                            <Badge variant="outline">{formatCfaScope(event.cfaScope)}</Badge>
                            <Badge variant="secondary">{formatStatus(event.status)}</Badge>
                            <Badge variant="outline">{formatPriority(event.priority)}</Badge>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatDateRange(event.startDate, event.endDate)}
                        </div>
                      </div>

                      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                        <InfoChip icon={MapPin} label="Lieu" value={event.location ?? "Non renseigne"} />
                        <InfoChip icon={User} label="Responsable" value={event.owner ?? "Non renseigne"} />
                        <InfoChip
                          icon={Target}
                          label="Objectif"
                          value={event.mainGoal ?? "Non renseigne"}
                        />
                        <InfoChip
                          icon={CalendarDays}
                          label="Debut"
                          value={formatSingleDate(event.startDate)}
                        />
                      </div>

                      {event.notes ? (
                        <div className="mt-4 rounded-2xl bg-white/80 p-4">
                          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                            Notes
                          </p>
                          <p className="mt-2 text-sm text-foreground">{event.notes}</p>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
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

function InfoChip({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="rounded-2xl bg-white/80 p-3">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <Icon className="size-3.5" />
        {label}
      </div>
      <p className="mt-2 text-sm font-medium">{value}</p>
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

function formatDateRange(startDate: Date, endDate: Date | null) {
  if (!endDate) {
    return formatSingleDate(startDate)
  }

  return `${formatSingleDate(startDate)} - ${formatSingleDate(endDate)}`
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

function formatPriority(value: string) {
  return priorityOptions.find((option) => option.value === value)?.label ?? value
}

const selectClassName =
  "flex h-8 w-full rounded-2xl border border-transparent bg-input/50 px-2.5 py-1 text-sm transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
