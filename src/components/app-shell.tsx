"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { LucideIcon } from "lucide-react"
import {
  BarChart3,
  CalendarDays,
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
import { createEventAction } from "@/components/events/actions"
import { CreateEventDrawer } from "@/components/events/create-event-drawer"
import {
  cfaScopeOptions,
  eventTypeOptions,
  statusOptions,
} from "@/components/events/event-config"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

type NavigationItem = {
  label: string
  href: string
  icon: LucideIcon
  section: string
  subtitle?: string
}

const navigation: NavigationItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard, section: "Communication / dashboard V1", subtitle: "Poste de pilotage pour arbitrer, preparer et suivre la saison evenementielle." },
  { label: "Evenements", href: "/evenements", icon: CalendarDays, section: "Communication / module Evenements", subtitle: "Gestion operationnelle de la liste, des statuts et de la preparation terrain." },
  { label: "Documents", href: "/documents", icon: FolderOpen, section: "Communication / module Documents", subtitle: "Espace documentaire et classement des pieces liees aux evenements." },
  { label: "PLV / Kits", href: "/plv-kits", icon: ClipboardList, section: "Communication / module PLV / Kits", subtitle: "Suivi du materiel, des kits et des supports terrain." },
  { label: "Formations", href: "/formations", icon: GraduationCap, section: "Communication / module Formations", subtitle: "Priorisation des formations a pousser par cible et territoire." },
  { label: "Leads", href: "/leads", icon: Users, section: "Communication / module Leads", subtitle: "Collecte, qualification et relances des prospects." },
  { label: "Landing pages", href: "/landing-pages", icon: Megaphone, section: "Communication / module Landing pages", subtitle: "Pages publiques et formulaires relies aux actions evenementielles." },
  { label: "Reporting", href: "/reporting", icon: BarChart3, section: "Communication / module Reporting", subtitle: "Lecture rapide du ROI et des bilans de campagne." },
  { label: "Parametres", href: "/parametres", icon: Settings, section: "Communication / module Parametres", subtitle: "Reglages simples du MVP et preferences de pilotage." },
  { label: "Aide", href: "/aide", icon: CircleHelp, section: "Communication / module Aide", subtitle: "Consignes d'usage et documentation rapide." },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const currentItem =
    navigation.find((item) => item.href === pathname) ?? navigation[0]

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f7f3_0%,#f3f4ef_26%,#eef1ea_100%)] text-foreground">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <AppSidebar
          pathname={pathname}
          className="hidden border-r border-border/60 bg-white/85 lg:flex lg:w-72 lg:flex-col"
        />

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-border/60 bg-white/80 backdrop-blur">
            <div className="mx-auto flex w-full max-w-7xl items-start justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-start gap-4">
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
                        <p className="mt-1 text-sm text-muted-foreground">Navigation V1 communication</p>
                      </div>
                      <AppSidebar pathname={pathname} className="flex h-full flex-col bg-white" />
                    </SheetContent>
                  </Sheet>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">{currentItem.section}</p>
                  <h1 className="text-2xl font-semibold tracking-tight">{currentItem.label}</h1>
                  {currentItem.subtitle ? (
                    <p className="mt-1 text-sm text-muted-foreground">{currentItem.subtitle}</p>
                  ) : null}
                </div>
              </div>

              <CreateEventDrawer
                action={createEventAction}
                eventTypeOptions={eventTypeOptions}
                cfaScopeOptions={cfaScopeOptions}
                statusOptions={statusOptions}
                triggerClassName="w-full sm:w-auto"
              />
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

function AppSidebar({
  pathname,
  className,
}: {
  pathname: string
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
            const isCurrent = item.href === pathname

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
        <p className="text-sm font-medium">Saison 2025-2026</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Vision unique pour arbitrer, preparer et mesurer les evenements.
        </p>
      </div>
    </aside>
  )
}
