# AGENTS.md

## Role

You are coding a local MVP for an internal event management platform for IFIR and CFA Sport & Animation.

Codex codes.  
The user and ChatGPT handle product thinking, prioritization and validation.

## Main goal

Build a simple, local, free and portable MVP to plan, prepare, track and evaluate events such as salons, JPO and webinars.

The V1 priority is the communication/event management dashboard and event detail pages.

## Core rules

- Keep the app simple and usable quickly.
- Do not over-engineer.
- Do not add paid tools.
- Do not build V2 features unless explicitly requested.
- Prefer small focused edits.
- Reuse existing components and dependencies.
- Do not add dependencies without approval.

## Token budget rules

The user has limited Codex tokens.

- Be brief by default.
- Do not restate product docs.
- Do not paste full files unless asked.
- Read only files needed for the task.
- Do not scan the whole repository.
- Use targeted reads and `rg`.
- Avoid generated, dependency, upload, import and export folders.
- Keep post-coding explanations short.

## Commands

Prefer RTK when available:

- `rtk git status`
- `rtk git diff --stat`
- `rtk pnpm build`
- `rtk pnpm lint`
- `rtk rg`
- `rtk find`

If a command fails, show only the useful error and likely fix.

## Avoid inspecting unless needed

Avoid:

- `node_modules/`
- `.next/`
- `dist/`
- `build/`
- `coverage/`
- `uploads/`
- `imports/`
- `exports/`
- `src/generated/`
- `pnpm-lock.yaml`, unless dependency changes are relevant.

## Stack

Use the existing stack:

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Prisma
- SQLite
- local file uploads
- pnpm
- RTK

Use installed dependencies before adding anything new.

## Product boundaries

The internal app is for staff only.

Prospects may only access public landing pages and forms.

The app does not replace official CFA enrollment.

V1 accepts manual imports for QR and Matomo stats.

Out of scope unless explicitly requested:

- advanced authentication;
- production deployment;
- automatic Outlook or Microsoft Graph integration;
- automatic Matomo API integration;
- employer portal;
- job board;
- payments;
- real email sending;
- CFA administrative registration;
- complex automation workflows;
- simplified chargée de formation dashboard.

## Relevant docs

Read only the docs needed for the current task:

- `docs/MVP_SCOPE.md` for scope questions;
- `docs/DATA_MODEL.md` for schema or model changes;
- `docs/DECISIONS.md` for past decisions;
- `docs/PRODUCT_BRIEF.md` for product or UX decisions;
- `docs/DASHBOARD_ARCHITECTURE.md` for dashboard work;
- `docs/USER_ROLES.md` for role-related work;
- `docs/PREINSTALLED_TOOLS.md` and `docs/DEPENDENCY_POLICY.md` before dependency work.

Do not read all docs by default.

## Coding rules

- Modify only files needed for the requested task.
- Do not refactor unrelated code.
- Do not regenerate the app to fix a small issue.
- Keep components small and readable.
- Prefer explicit names over clever abstractions.
- Prefer server-side logic when it keeps the app simpler.
- Use TypeScript types for domain objects.
- Keep forms simple and fast to use.
- Add basic validation for required fields.
- Keep UI clean, professional and functional.

## Workflow

- Make the smallest working version first.
- Verify it builds when relevant.
- Avoid broad changes.
- One task = one focused change.
- Generalize only after duplication becomes painful.

## Verification

Before finishing a coding task, run relevant checks when available:

- `rtk pnpm build`
- `rtk pnpm lint`
- Prisma commands when schema changes.

If a check fails, explain briefly and do not hide it.

## Response format

After coding, respond briefly with:

- changed files;
- checks run;
- result;
- known limits;
- next step.

Do not paste long code unless requested.

## Small issue handling

For small build, lint, install or configuration issues, do not attempt an automatic fix unless explicitly asked.

Instead:

- stop after diagnosis;
- explain the useful error briefly;
- identify the likely file or cause;
- do not suggest fix unless asked, but indicate where to find the error log
- wait for the user to confirm before editing.

The user may choose to fix small issues manually with ChatGPT to save Codex tokens.

