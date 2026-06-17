# Preinstalled tools

These packages are already installed to save Codex tokens and avoid rebuilding common features.

## UI

- shadcn/ui components
- lucide-react for icons
- clsx and tailwind-merge for class names
- sonner for notifications/toasts

Use shadcn/ui components before creating custom UI primitives.

## Forms

- react-hook-form
- zod
- @hookform/resolvers

Use these for all internal and public forms.

## Tables

- @tanstack/react-table

Use it for event lists, leads, PLV inventory, formations and reporting tables.

## Charts

- recharts

Use it for dashboard and ROI charts.

## CSV

- papaparse

Use it for manual imports/exports: QR stats, Matomo exports, leads and reporting.

## Dates

- date-fns
- react-day-picker

Use them for event dates, due dates, filters and calendar-like UI.

## QR demo

- qrcode

Use only for local/demo QR generation. The real QR tool already exists and may be connected later.

## Rule

Do not add a new dependency unless it clearly saves time and is justified.