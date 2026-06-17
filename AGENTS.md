# AGENTS.md

## Role

You are working on a local MVP for an internal event management platform for two CFA organizations: IFIR and CFA Sport & Animation.

The app helps plan and evaluate salons, JPO and events. The V1 priority is organization: events, documents, tasks, PLV/materials, communication kits, priority trainings, leads, simple landing pages and basic ROI reporting.

## Main rule

Keep the app simple, local, free and usable quickly.

Do not over-engineer. Do not add paid tools. Do not build V2 features unless explicitly asked.

## Token economy and context discipline

The user has limited Codex tokens. Work in a token-efficient way.

Before coding:
- Read only the files needed for the task.
- Do not scan the entire repository unless required.
- Start from `docs/MVP_SCOPE.md`, `docs/DATA_MODEL.md`, `docs/DECISIONS.md`, and `docs/PREINSTALLED_TOOLS.md`.
- Read `docs/PRODUCT_BRIEF.md` only for product, UX or scope decisions.
- Do not paste long file contents in the response.
- Do not restate the whole brief unless asked.

During coding:
- Make the smallest useful change.
- Modify only files directly related to the task.
- Do not refactor unrelated code.
- Do not regenerate the whole application.
- Do not rewrite stable files for style-only changes.
- Prefer editing existing components over creating duplicates.
- Prefer simple CRUD and server actions over complex abstractions.
- Prefer manual import/export for V1 if an API integration would take too long.
- Stop and ask before adding large dependencies, new frameworks or major architecture changes.

After coding:
- Keep the final summary short.
- List only changed files.
- Explain only how to test the change.
- Mention blockers briefly.
- Do not include long code snippets unless requested.

## Open source first

Before building a complex feature from scratch, check whether a free and open-source package can solve it simply.

Use open-source libraries only if they:
- are free for local/internal use;
- avoid a lot of custom code;
- are actively maintained;
- work well with the current stack;
- do not require paid hosting or paid accounts;
- do not make the MVP harder to understand.

Do not install a package just for a tiny feature that can be coded simply.

When proposing a dependency, provide:
- package name;
- purpose;
- why it saves work/tokens;
- whether it is optional;
- command to install.

## Repository layout

- `docs/` — product brief, scope, data model, roles, decisions and dependency policy.
- `prompts/` — reusable prompts for Codex tasks.
- `uploads/` — local uploaded files for quotes, invoices, emails and communication assets.
- `imports/` — manual imports, such as QR stats or Matomo exports.
- `exports/` — generated CSV or report exports.
- `src/app/` — Next.js routes and pages.
- `src/components/` — reusable UI components.
- `src/lib/` — shared utilities, database helpers and validation.
- `prisma/` — Prisma schema, migrations and seed data.

## Required context before coding

Before implementing any task, read:

- `docs/MVP_SCOPE.md`
- `docs/DATA_MODEL.md`
- `docs/DECISIONS.md`
- `docs/PREINSTALLED_TOOLS.md`
- `docs/DEPENDENCY_POLICY.md`

Read `docs/PRODUCT_BRIEF.md` only when the task involves product, UX or scope decisions.

## Technical stack

Use:

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Prisma
- SQLite
- Local file uploads

Do not add a dependency unless it clearly saves time or avoids fragile custom code. If a dependency is added, explain why.

## Preinstalled tools

Use the installed dependencies whenever relevant:

- shadcn/ui for UI components
- lucide-react for icons
- react-hook-form, zod and @hookform/resolvers for forms
- @tanstack/react-table for tables
- recharts for charts
- papaparse for CSV imports/exports
- date-fns and react-day-picker for dates
- sonner for toasts
- qrcode only for local/demo QR generation

## V1 scope

V1 includes:

- dashboard
- events
- event detail page
- documents uploaded and classified by event
- tasks
- calendar-style overview
- PLV/material inventory
- communication kits per event
- priority trainings per event
- leads CRM
- simple landing pages and forms
- JPO registration intent tracking
- basic ROI reporting
- manual QR stats fields or imports
- manual Matomo stats fields or imports

## Out of scope unless explicitly requested

Do not build:

- advanced authentication
- production deployment
- Outlook automatic integration
- Microsoft Graph integration
- Matomo API integration
- automatic QR code tool integration
- employer portal
- job board
- payment features
- complex automation workflows
- real email sending
- CFA administrative registration

## Product rules

- The internal app is for staff only.
- Young people and prospects only access public landing pages and forms.
- The platform does not replace official CFA enrollment.
- Documents must be uploaded into the app, not only linked externally.
- Outlook emails are imported as saved files, then classified manually.
- ROI can be approximate in V1.
- Manual import is acceptable when automatic integration would slow the MVP.

## Workflow rules

Use a staged implementation style:
1. Make the smallest working version.
2. Verify it builds.
3. Commit before starting a new feature.
4. Avoid long-running broad changes.

Use a simple "caveman" style when coding:
- make it work first;
- keep the data flow obvious;
- avoid clever abstractions;
- prefer readable files and boring code;
- only generalize after duplication becomes painful.

## Coding rules

- Modify only files needed for the requested task.
- Do not refactor unrelated code.
- Do not regenerate the whole app to fix a small issue.
- Keep components small and readable.
- Prefer explicit names over clever abstractions.
- Prefer server-side logic where it keeps the app simpler.
- Use TypeScript types for domain objects.
- Keep forms simple and fast to use.
- Add basic validation for required fields.
- Keep UI clean, professional and functional.

## UX rules

The most important screen is the event detail page.

The second most important screen is the communication dashboard.

The V1 dashboard is designed first for the communication/event management role.
It should be complete enough to support planning, arbitration, preparation, lead collection and ROI follow-up.

A simplified dashboard for “chargées de formation” may be designed later, but it is not the first implementation target.

Each event should answer quickly:

Why are we doing this event?
What should it produce?
Who is responsible?
What documents, tasks and materials are linked?
Which trainings should be pushed?
Which leads came from it?
What did it cost?
Was it worth doing?

The dashboard should answer quickly:

What events need arbitration?
What is urgent?
What is validated?
What needs preparation?
Which trainings should be pushed?
Are landing pages and forms ready?
Are leads being collected and followed?
What are the early ROI signals?

## Data and privacy rules

- Use fake/demo data until real deployment is approved.
- Do not commit personal data.
- Do not commit real invoices, emails or private documents.
- Uploaded files should remain local in `uploads/`.
- Public forms must include a placeholder for consent wording.

## Verification

Before finishing a coding task, run the relevant checks if available:

- `pnpm lint`
- `pnpm build`
- Prisma generation/migration commands when the schema changes

If a command fails, explain the failure and the likely fix.

## Done criteria

A task is done when:

- the feature is visible or testable locally;
- it respects V1 scope;
- it uses the existing data model or updates it cleanly;
- the UI is usable without hidden steps;
- no unrelated files were changed;
- important decisions are added to `docs/DECISIONS.md`.

## Response format after each task

At the end of each task, summarize briefly:

- what was created or changed;
- which files were modified;
- how to test locally;
- any known limits or next steps.