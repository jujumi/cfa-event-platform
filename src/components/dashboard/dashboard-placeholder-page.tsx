"use client"

import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import {
  BarChart3,
  CalendarDays,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  FolderOpen,
  GraduationCap,
  LayoutDashboard,
  Menu,
  Megaphone,
  Settings,
  Target,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"
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

type PlaceholderPageProps = {
  currentPath: string
  title: string
  description: string
  cardTitle: string
  cardDescription: string
}

type NavigationItem = {
  label: string
  href: string
  icon: LucideIcon
}

const navigation: NavigationItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Evenements", href: "/evenements", icon: CalendarDays },
  { label: "Documents", href: "/documents", icon: FolderOpen },
  { label: "PLV / Kits", href: "/plv-kits", icon: ClipboardList },
  { label: "Formations", href: "/formations", icon: GraduationCap },
  { label: "Leads", href: "/leads", icon: Users },
  { label: "Landing pages", href: "/landing-pages", icon: Megaphone },
  { label: "Reporting", href: "/reporting", icon: BarChart3 },
  { label: "Parametres", href: "/parametres", icon: Settings },
  { label: "Aide", href: "/aide", icon: CircleHelp },
]

export function DashboardPlaceholderPage({
  currentPath,
  title,
  description,
  cardTitle,
  cardDescription,
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f7f3_0%,#f3f4ef_26%,#eef1ea_100%)] text-foreground">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <PlaceholderSidebar
          currentPath={currentPath}
          className="hidden border-r border-border/60 bg-white/85 lg:flex lg:w-72 lg:flex-col"
        />

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-border/60 bg-white/80 backdrop-blur">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3">
                <div className="lg:hidden">
                  <Sheet>
                    <SheetTrigger
                      render={
                        <Button variant="outline" size="icon" aria-label="Ouvrir la navigation" />
                      }
                    >
                      <Menu />
                    </SheetTrigger>
                    <SheetContent
                      side="left"
                      className="w-[88vw] max-w-80 p-0"
                      showCloseButton={false}
                    >
                      <div className="border-b border-border/60 p-5">
                        <SheetTitle className="text-left">Pilotage evenements</SheetTitle>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Navigation V1 communication
                        </p>
                      </div>
                      <PlaceholderSidebar currentPath={currentPath} className="flex h-full flex-col bg-white" />
                    </SheetContent>
                  </Sheet>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Communication / module placeholder
                  </p>
                  <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
                </div>
              </div>

              <Button variant="outline" size="sm" render={<Link href="/" />}>
                Retour dashboard
              </Button>
            </div>
          </header>

          <main className="flex-1 px-4 pb-8 pt-6 sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
              <Card className="border border-border/60 bg-white/90 shadow-none">
                <CardHeader>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
              </Card>

              <Card className="border border-border/60 bg-white/90 shadow-none">
                <CardHeader>
                  <CardTitle>{cardTitle}</CardTitle>
                  <CardDescription>{cardDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-[24px] border border-dashed border-border/70 bg-muted/20 p-6">
                    <p className="text-sm text-muted-foreground">
                      Cette page servira de base pour la V1. Le contenu reste statique tant que
                      les flux, tables et actions metier ne sont pas branches.
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-secondary px-3 py-2 text-sm">
                      <span>Prochaine etape</span>
                      <ChevronRight className="size-4" />
                      <span>connecter les vrais blocs du module</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

function PlaceholderSidebar({
  currentPath,
  className,
}: {
  currentPath: string
  className?: string
}) {
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
            const isCurrent = item.href === currentPath

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition-colors",
                    isCurrent
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="size-4" />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="m-3 rounded-[22px] border border-border/60 bg-muted/60 p-4">
        <p className="text-sm font-medium">Navigation V1</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Chaque module dispose maintenant d'une page placeholder dediee.
        </p>
      </div>
    </aside>
  )
}
