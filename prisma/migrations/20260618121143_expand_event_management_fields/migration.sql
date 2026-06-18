-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "cfaScope" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "location" TEXT,
    "owner" TEXT,
    "priority" TEXT NOT NULL DEFAULT 'MEDIUM',
    "mainGoal" TEXT,
    "notes" TEXT,
    "budgetEstimated" REAL,
    "budgetNotes" TEXT,
    "participantsIfir" INTEGER,
    "participantsSport" INTEGER,
    "reportStatus" TEXT NOT NULL DEFAULT 'PAS_FAIT',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Event" ("cfaScope", "createdAt", "endDate", "eventType", "id", "location", "mainGoal", "notes", "owner", "priority", "startDate", "status", "title", "updatedAt") SELECT "cfaScope", "createdAt", "endDate", "eventType", "id", "location", "mainGoal", "notes", "owner", "priority", "startDate", "status", "title", "updatedAt" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
CREATE INDEX "Event_startDate_idx" ON "Event"("startDate");
CREATE INDEX "Event_status_idx" ON "Event"("status");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
