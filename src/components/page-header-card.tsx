import type { ReactNode } from "react"
import { CardDescription, CardTitle } from "@/components/ui/card"

export function PageHeaderCard({
  title,
  description,
  actions,
}: {
  title: string
  description: string
  actions?: ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div>
        <CardTitle className="text-2xl font-semibold tracking-tight">{title}</CardTitle>
        <CardDescription className="mt-1">{description}</CardDescription>
      </div>
      {actions ? <div>{actions}</div> : null}
    </div>
  )
}
