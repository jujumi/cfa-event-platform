"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"

type Option = {
  value: string
  label: string
}

export function CreateEventDrawer({
  action,
  eventTypeOptions,
  cfaScopeOptions,
  statusOptions,
}: {
  action: (formData: FormData) => Promise<void>
  eventTypeOptions: readonly Option[]
  cfaScopeOptions: readonly Option[]
  statusOptions: readonly Option[]
}) {
  const [cfaScope, setCfaScope] = useState("BOTH")

  const showIfirParticipants = cfaScope === "IFIR" || cfaScope === "BOTH"
  const showSportParticipants = cfaScope === "SPORT" || cfaScope === "BOTH"

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
                value={cfaScope}
                onChange={(event) => setCfaScope(event.target.value)}
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

            <FormField label="Nombre de jours" htmlFor="durationDays">
              <Input
                id="durationDays"
                name="durationDays"
                type="number"
                min="0.5"
                step="0.5"
                defaultValue="1"
              />
            </FormField>
          </div>

          <FormField label="Date de l'evenement" htmlFor="startDate" required>
            <Input id="startDate" name="startDate" type="date" required />
          </FormField>

          <FormField label="Lieu / adresse" htmlFor="location">
            <Input id="location" name="location" placeholder="Ex. Eurexpo Lyon, boulevard..." />
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

          {(showIfirParticipants || showSportParticipants) && (
            <div className="grid gap-4 sm:grid-cols-2">
              {showIfirParticipants ? (
                <FormField label="Participants IFIR" htmlFor="participantsIfir">
                  <Input id="participantsIfir" name="participantsIfir" type="number" min="0" step="1" />
                </FormField>
              ) : (
                <input type="hidden" name="participantsIfir" value="" />
              )}

              {showSportParticipants ? (
                <FormField label="Participants CFA Sport" htmlFor="participantsSport">
                  <Input id="participantsSport" name="participantsSport" type="number" min="0" step="1" />
                </FormField>
              ) : (
                <input type="hidden" name="participantsSport" value="" />
              )}
            </div>
          )}

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

function FormField({
  label,
  htmlFor,
  required = false,
  children,
}: {
  label: string
  htmlFor: string
  required?: boolean
  children: React.ReactNode
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

const selectClassName =
  "flex h-8 w-full rounded-2xl border border-transparent bg-input/50 px-2.5 py-1 text-sm transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
