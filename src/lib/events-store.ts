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
  endDate: Date | null
  location: string | null
  owner: string | null
  priority: string
  mainGoal: string | null
  notes: string | null
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
  endDate: string | null
  location: string | null
  owner: string | null
  priority: string
  mainGoal: string | null
  notes: string | null
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
      `SELECT id, title, eventType, cfaScope, status, startDate, endDate, location, owner, priority, mainGoal, notes, createdAt, updatedAt
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
  endDate: Date | null
  location: string | null
  owner: string | null
  priority: string
  mainGoal: string | null
  notes: string | null
}) {
  const database = getDatabase()
  const now = new Date().toISOString()

  database
    .prepare(
      `INSERT INTO "Event" (
        id, title, eventType, cfaScope, status, startDate, endDate, location, owner, priority, mainGoal, notes, createdAt, updatedAt
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )`
    )
    .run(
      randomUUID(),
      input.title,
      input.eventType,
      input.cfaScope,
      input.status,
      input.startDate.toISOString(),
      input.endDate?.toISOString() ?? null,
      input.location,
      input.owner,
      input.priority,
      input.mainGoal,
      input.notes,
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
