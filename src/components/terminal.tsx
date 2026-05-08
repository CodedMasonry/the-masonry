import { useTerminal } from "@/hooks/useTerminal"
import { cn } from "@/lib/utils"

const LINE_COLOR: Record<string, string> = {
  ok: "text-foreground",
  warn: "text-amber-400/90",
  stderr: "text-red-400/90",
  stdout: "text-muted-foreground/90",
  separator: "text-muted-foreground",
  session: "text-muted-foreground",
}

// Map specific symbols to line types
const LINE_SYMBOL: Record<string, string> = {
  ok: ">",
  warn: "!",
  stderr: "×",
  stdout: ">",
  separator: "",
}

export function Terminal() {
  const { lines } = useTerminal()

  return (
    <div className="fixed bottom-4 left-4 flex flex-col border border-border bg-background/95 text-[10px] tracking-wider uppercase shadow-2xl backdrop-blur-md">
      <div className="flex min-w-120 flex-col gap-0 px-4 py-3">
        {lines.map((line) => {
          if (line.type === "separator") {
            return (
              <div
                key={line.id}
                className="flex items-center gap-2 py-2 text-muted-foreground/75 select-none"
              >
                <div className="h-px w-full bg-current" />
                <span className="shrink-0 text-[8px] font-bold">
                  {line.text}
                </span>
                <div className="h-px w-full bg-current" />
              </div>
            )
          }

          return (
            <div
              key={line.id}
              className={cn(
                "flex items-baseline gap-2 py-px transition-colors duration-300",
                LINE_COLOR[line.type] || "text-foreground"
              )}
            >
              {/* Symbolic Indicator */}
              <span
                className={cn(
                  "w-3 shrink-0 font-bold",
                  line.type === "ok"
                    ? "text-emerald-500/75"
                    : "text-muted-foreground/50"
                )}
              >
                {LINE_SYMBOL[line.type] || ">"}
              </span>

              <span className="leading-tight">{line.text}</span>
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-between border-t border-border bg-muted/20 px-3 py-1.5 text-[9px] text-muted-foreground/60">
        <div className="flex gap-4">
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-1 animate-pulse rounded-full bg-amber-500" />
            V3.0.0-UNSTABLE
          </span>
          <span>SYSLOG_{new Date().getUTCFullYear()}</span>
        </div>
        <span className="tabular-nums">
          0x{Math.random().toString(16).slice(2, 6).toUpperCase()}
        </span>
      </div>
    </div>
  )
}
