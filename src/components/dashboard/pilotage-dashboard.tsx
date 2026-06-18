"use client"

import {
  AlertCircle,
  BarChart3,
  BookOpen,
  CalendarDays,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  Filter,
  Flag,
  FolderOpen,
  GraduationCap,
  LayoutDashboard,
  Menu,
  Megaphone,
  Settings,
  Target,
  TrendingUp,
  Users,
} from "lucide-react"

import {
  dashboardKpis,
  dashboardLeadCollection,
  dashboardPipeline,
  dashboardPriorityActions,
  dashboardPriorityTrainings,
  dashboardRoiMetrics,
  dashboardSpendSplit,
  dashboardUpcomingEvents,
  type DashboardKpiIcon,
} from "@/components/dashboard/pilotage-dashboard-data"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard, current: true },
  { label: "Evenements", icon: CalendarDays },
  { label: "Documents", icon: FolderOpen },
  { label: "PLV / Kits", icon: ClipboardList },
  { label: "Formations", icon: GraduationCap },
  { label: "Leads", icon: Users },
  { label: "Landing pages", icon: Megaphone },
  { label: "Reporting", icon: BarChart3 },
  { label: "Parametres", icon: Settings },
  { label: "Aide", icon: CircleHelp },
]

const kpiIcons: Record<DashboardKpiIcon, typeof AlertCircle> = {
  "alert-circle": AlertCircle,
  "calendar-days": CalendarDays,
  flag: Flag,
  users: Users,
}

export function PilotageDashboard() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f7f3_0%,#f3f4ef_26%,#eef1ea_100%)] text-foreground">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <DashboardSidebar className="hidden border-r border-border/60 bg-white/85 lg:flex lg:w-72 lg:flex-col" />

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <DashboardHeader />

          <main className="flex-1 px-4 pb-8 sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
              <DashboardFilters />
              <DashboardKpis />

              <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                <PriorityActionsCard />
                <EventPipelineCard />
              </div>

              <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                <UpcomingEventsCard />
                <PriorityTrainingsCard />
              </div>

              <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                <LeadCollectionCard />
                <RoiReportingCard />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

function DashboardHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger
                render={<Button variant="outline" size="icon" aria-label="Ouvrir la navigation" />}
              >
                <Menu />
              </SheetTrigger>
              <SheetContent side="left" className="w-[88vw] max-w-80 p-0" showCloseButton={false}>
                <div className="border-b border-border/60 p-5">
                  <SheetTitle className="text-left">Pilotage evenements</SheetTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Navigation V1 communication
                  </p>
                </div>
                <DashboardSidebar className="flex h-full flex-col bg-white" />
              </SheetContent>
            </Sheet>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">Communication / dashboard V1</p>
            <h1 className="text-2xl font-semibold tracking-tight">Pilotage evenements</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Export rapide
          </Button>
          <Button size="sm">Nouvel evenement</Button>
        </div>
      </div>
    </header>
  )
}

function DashboardSidebar({ className }: { className?: string }) {
  return (
    <aside className={cn("min-h-screen", className)}>
      <div className="flex items-center gap-3 px-5 py-5">
        <div className="flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Target className="size-5" />
        </div>
        <div>
          <p className="text-sm font-semibold">CFA Event Platform</p>
          <p className="text-xs text-muted-foreground">MVP interne</p>
        </div>
      </div>

      <Separator />

      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon

            return (
              <li key={item.label}>
                <a
                  href="#"
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition-colors",
                    item.current
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="size-4" />
                  <span>{item.label}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="m-3 rounded-[22px] border border-border/60 bg-muted/60 p-4">
        <p className="text-sm font-medium">Saison 2025-2026</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Vision unique pour arbitrer, preparer et mesurer les evenements.
        </p>
      </div>
    </aside>
  )
}

function DashboardFilters() {
  const filters = [
    { label: "Saison", value: "2025-2026" },
    { label: "CFA", value: "IFIR + Sport" },
    { label: "Periode", value: "Sept. - Dec." },
    { label: "Statut", value: "Tous" },
    { label: "Type", value: "Salons, JPO, webinaires" },
  ]

  return (
    <Card className="border border-border/60 bg-white/85 py-4 shadow-none">
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Filter className="size-4 text-muted-foreground" />
          Filtres de pilotage
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <div
              key={filter.label}
              className="rounded-2xl border border-border/70 bg-background px-3 py-2"
            >
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {filter.label}
              </p>
              <p className="mt-1 text-sm font-medium">{filter.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function DashboardKpis() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {dashboardKpis.map((item) => {
        const Icon = kpiIcons[item.icon]

        return (
          <Card key={item.label} className="border border-border/60 bg-white/90 shadow-none">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardDescription>{item.label}</CardDescription>
                  <CardTitle className="mt-2 text-3xl font-semibold">{item.value}</CardTitle>
                </div>
                <div className="rounded-2xl bg-secondary p-2 text-foreground">
                  <Icon className="size-4" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.note}</p>
            </CardContent>
          </Card>
        )
      })}
    </section>
  )
}

function PriorityActionsCard() {
  return (
    <Card className="border border-border/60 bg-white/90 shadow-none">
      <CardHeader>
        <CardTitle>A traiter en priorite</CardTitle>
        <CardDescription>
          Les points qui bloquent la preparation, la diffusion ou l'analyse.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {dashboardPriorityActions.map((item) => (
          <div
            key={item.title}
            className="flex items-start justify-between gap-4 rounded-[22px] border border-border/60 bg-muted/30 p-4"
          >
            <div className="min-w-0">
              <p className="font-medium">{item.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
            </div>
            <Badge variant="outline">{item.badge}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function EventPipelineCard() {
  return (
    <Card className="border border-border/60 bg-white/90 shadow-none">
      <CardHeader>
        <CardTitle>Pipeline evenements</CardTitle>
        <CardDescription>Vue rapide des arbitrages et chantiers par statut.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-5">
          {dashboardPipeline.map((column) => (
            <div key={column.status} className="rounded-[24px] bg-muted/35 p-3">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-medium">{column.status}</p>
                <Badge variant="secondary">{column.items.length}</Badge>
              </div>
              <div className="space-y-3">
                {column.items.map((item) => (
                  <div key={item.name} className="rounded-2xl border border-border/60 bg-white p-3">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.meta}</p>
                    <Badge variant="outline" className="mt-3">
                      {item.tag}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function UpcomingEventsCard() {
  return (
    <Card className="border border-border/60 bg-white/90 shadow-none">
      <CardHeader>
        <CardTitle>Prochains evenements</CardTitle>
        <CardDescription>Bloc operationnel pour preparer la prochaine sequence.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Evenement</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Lieu</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Responsable</TableHead>
              <TableHead>Prochaine action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dashboardUpcomingEvents.map((event) => (
              <TableRow key={event.event}>
                <TableCell className="font-medium">{event.date}</TableCell>
                <TableCell>{event.event}</TableCell>
                <TableCell>{event.type}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>
                  <Badge variant="outline">{event.status}</Badge>
                </TableCell>
                <TableCell>{event.owner}</TableCell>
                <TableCell className="text-muted-foreground">{event.nextAction}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function PriorityTrainingsCard() {
  return (
    <Card className="border border-border/60 bg-white/90 shadow-none">
      <CardHeader>
        <CardTitle>Formations a pousser</CardTitle>
        <CardDescription>
          Argumentaire prioritaire a aligner avec le public cible et le territoire.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {dashboardPriorityTrainings.map((training) => (
          <div
            key={training.name}
            className="rounded-[22px] border border-border/60 bg-muted/25 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-secondary p-2">
                  <BookOpen className="size-4" />
                </div>
                <div>
                  <p className="font-medium">{training.name}</p>
                  <p className="text-sm text-muted-foreground">{training.cfa}</p>
                </div>
              </div>
              <Badge>{training.tag}</Badge>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{training.note}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function LeadCollectionCard() {
  return (
    <Card className="border border-border/60 bg-white/90 shadow-none">
      <CardHeader>
        <CardTitle>Collecte et parcours prospect</CardTitle>
        <CardDescription>
          Verifier que l'activite evenementielle produit des contacts exploitables.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {dashboardLeadCollection.metrics.map((metric) => (
            <div key={metric.label} className="rounded-[20px] border border-border/60 bg-muted/25 p-4">
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <p className="mt-2 text-2xl font-semibold">{metric.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[24px] border border-border/60 bg-muted/25 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-medium">Parcours de conversion</p>
              <p className="text-sm text-muted-foreground">
                {dashboardLeadCollection.conversionSummary}
              </p>
            </div>
            <TrendingUp className="size-5 text-muted-foreground" />
          </div>
          <div className="mt-4 flex items-center gap-2 overflow-x-auto">
            {dashboardLeadCollection.conversionSteps.map((step, index) => (
              <div key={step} className="flex items-center gap-2">
                <Badge variant={index < 4 ? "default" : "secondary"}>{step}</Badge>
                {index < 5 ? <ChevronRight className="size-4 text-muted-foreground" /> : null}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function RoiReportingCard() {
  return (
    <Card className="border border-border/60 bg-white/90 shadow-none">
      <CardHeader>
        <CardTitle>ROI / bilan rapide</CardTitle>
        <CardDescription>
          Lecture concise avant d'aller vers la page reporting detaillee.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-2">
          {dashboardRoiMetrics.map((metric) => (
            <div key={metric.label} className="rounded-[20px] border border-border/60 bg-muted/25 p-4">
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <p className="mt-2 text-2xl font-semibold">{metric.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{metric.helper}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[24px] border border-border/60 bg-muted/25 p-4">
          <div className="mb-4 flex items-center gap-2">
            <BarChart3 className="size-4 text-muted-foreground" />
            <p className="font-medium">Repartition des couts par type</p>
          </div>
          <div className="space-y-3">
            {dashboardSpendSplit.map((item) => (
              <div key={item.label}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="text-muted-foreground">{item.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary">
                  <div
                    className="h-2 rounded-full bg-foreground"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-dashed border-border bg-background/80 p-4 text-sm text-muted-foreground">
          Reporting detaille, exports et analyses par evenement viendront sur la page
          dediee.
        </div>
      </CardContent>
    </Card>
  )
}
