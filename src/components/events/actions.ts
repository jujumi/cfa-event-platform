"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createEventRecord } from "@/lib/events-store"
import {
  cfaScopeOptions,
  eventTypeOptions,
  statusOptions,
} from "@/components/events/event-config"

export async function createEventAction(formData: FormData) {
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

function computeEndDate(startDate: Date, durationDays: number) {
  if (durationDays <= 1) {
    return null
  }

  const endDate = new Date(startDate)
  endDate.setDate(endDate.getDate() + Math.ceil(durationDays) - 1)
  return endDate
}
