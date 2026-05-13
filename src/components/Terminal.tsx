import { useTerminal, type TerminalLine } from "@/hooks/useTerminal"
import { cn } from "@/lib/utils"

export function Terminal() {
  const { lines } = useTerminal()

  return (
    <div
      className={cn(
        "fixed z-50 flex flex-col border-border bg-background font-mono",
        "bottom-0 left-0 h-[25vh] w-full border-t",
        "lg:top-0 lg:left-0 lg:h-screen lg:w-96 lg:border-t-0 lg:border-r"
      )}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-border px-3 py-1.5 text-[10px] tracking-widest text-muted-foreground uppercase">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          <span className="font-bold">MASONRY_WEB</span>
        </div>
        <span className="opacity-50">
          0x{Math.random().toString(16).slice(2, 6).toUpperCase()}
        </span>
      </div>

      <div className="no-scrollbar flex min-h-0 flex-1 flex-col-reverse overflow-y-auto overscroll-none">
        <div className="flex flex-col px-3 py-2">
          {lines.map((line) => (
            <TerminalLineItem key={line.id} line={line} />
          ))}
        </div>
      </div>
    </div>
  )
}

function TerminalLineItem({ line }: { line: TerminalLine }) {
  if (line.type === "separator") {
    return (
      <div className="flex items-center gap-2 py-1 opacity-40">
        <div className="h-px flex-1 bg-muted" />
        <span className="text-[9px] font-black tracking-tighter text-muted-foreground uppercase">
          {line.text}
        </span>
        <div className="h-px flex-1 bg-muted" />
      </div>
    )
  }

  return (
    <div className="group relative flex flex-col py-px text-[11px] leading-tight transition-colors hover:bg-muted/40">
      <div className="relative pl-21">
        <span className="absolute top-0 left-0 shrink-0 font-mono text-muted-foreground/70 tabular-nums">
          [{line.timestamp}]
        </span>
        <div className="inline-flex flex-wrap items-baseline gap-x-1.5">
          {line.status && (
            <span className="shrink-0 font-bold tracking-tighter text-primary uppercase">
              {line.status}:
            </span>
          )}
          {line.label && (
            <span className="shrink-0 font-bold text-muted-foreground">
              [{line.label}]
            </span>
          )}
          <span
            className={cn(
              "overflow-wrap-anywhere break-all",
              line.type === "stderr"
                ? "text-destructive"
                : "text-foreground/80",
              line.type === "warn" && "text-warning"
            )}
          >
            {line.text}
          </span>
          {line.meta && (
            <span className="tracking-tighter break-all text-muted-foreground/60 italic opacity-70 group-hover:opacity-100">
              // {line.meta}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
