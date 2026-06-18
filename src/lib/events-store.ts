import { randomUUID } from "node:crypto"
import { join } from "node:path"
import { DatabaseSync } from "node:sqlite"

export type StoredEvent = {
  id: string
  title: string
  eventType: string
  cfaScope: string
  status: string
  startDate: Date
  durationDays: number | null
  endDate: Date | null
  location: string | null
  owner: string | null
  priority: string
  mainGoal: string | null
  notes: string | null
  budgetEstimated: number | null
  budgetNotes: string | null
  participantsIfir: number | null
  participantsSport: number | null
  reportStatus: string
  createdAt: Date
  updatedAt: Date
}

type StoredEventRow = {
  id: string
  title: string
  eventType: string
  cfaScope: string
  status: string
  startDate: string
  durationDays: number | null
  endDate: string | null
  location: string | null
  owner: string | null
  priority: string
  mainGoal: string | null
  notes: string | null
  budgetEstimated: number | null
  budgetNotes: string | null
  participantsIfir: number | null
  participantsSport: number | null
  reportStatus: string
  createdAt: string
  updatedAt: string
}

const globalForDatabase = globalThis as typeof globalThis & {
  eventsDatabase?: DatabaseSync
}

function getDatabase() {
  if (!globalForDatabase.eventsDatabase) {
    globalForDatabase.eventsDatabase = new DatabaseSync(join(process.cwd(), "dev.db"))
  }

  return globalForDatabase.eventsDatabase
}

export function listEvents() {
  const database = getDatabase()
  const rows = database
    .prepare(
      `SELECT id, title, eventType, cfaScope, status, startDate, durationDays, endDate, location, owner, priority, mainGoal, notes, budgetEstimated, budgetNotes, participantsIfir, participantsSport, reportStatus, createdAt, updatedAt
       FROM "Event"
       ORDER BY startDate ASC, createdAt DESC`
    )
    .all() as StoredEventRow[]

  return rows.map(mapEventRow)
}

export function createEventRecord(input: {
  title: string
  eventType: string
  cfaScope: string
  status: string
  startDate: Date
  durationDays: number | null
  endDate: Date | null
  location: string | null
  owner: string | null
  priority: string
  mainGoal: string | null
  notes: string | null
  budgetEstimated: number | null
  budgetNotes: string | null
  participantsIfir: number | null
  participantsSport: number | null
  reportStatus: string
}) {
  const database = getDatabase()
  const now = new Date().toISOString()

  database
    .prepare(
      `INSERT INTO "Event" (
        id, title, eventType, cfaScope, status, startDate, durationDays, endDate, location, owner, priority, mainGoal, notes, budgetEstimated, budgetNotes, participantsIfir, participantsSport, reportStatus, createdAt, updatedAt
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )`
    )
    .run(
      randomUUID(),
      input.title,
      input.eventType,
      input.cfaScope,
      input.status,
      input.startDate.toISOString(),
      input.durationDays,
      input.endDate?.toISOString() ?? null,
      input.location,
      input.owner,
      input.priority,
      input.mainGoal,
      input.notes,
      input.budgetEstimated,
      input.budgetNotes,
      input.participantsIfir,
      input.participantsSport,
      input.reportStatus,
      now,
      now
    )
}

function mapEventRow(row: StoredEventRow): StoredEvent {
  return {
    ...row,
    startDate: new Date(row.startDate),
    endDate: row.endDate ? new Date(row.endDate) : null,
    createdAt: new Date(row.createdAt),
    updatedAt: new Date(row.updatedAt),
  }
}
