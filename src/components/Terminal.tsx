import { useTerminal } from "@/hooks/useTerminal"
import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"

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
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new lines arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines])

  return (
    <div
      className={cn(
        "z-50 flex flex-col bg-background uppercase backdrop-blur-md transition-all duration-500",
        // Mobile: Fixed bottom bar
        "fixed bottom-0 left-0 h-[25vh] w-full border-t border-border/50",
        // Desktop: Vertical Gutter
        "border-border lg:top-0 lg:right-auto lg:left-0 lg:h-screen lg:w-80 lg:border-t-0 lg:border-r lg:bg-background/95"
      )}
    >
      <div className="flex items-center justify-between border-b border-border/50 px-4 py-2 text-[9px] tracking-widest text-muted-foreground/80">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          SYSTEM_LOG
        </span>
        <span className="font-mono">v3.0.0</span>
      </div>

      <div
        ref={scrollRef}
        className="scrollbar-hide flex-1 overflow-y-auto p-4"
      >
        <div className="flex flex-col gap-1 tracking-tight">
          {lines.map((line) => (
            <TerminalLine key={line.id} line={line} />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border/50 px-4 py-2 font-mono text-[9px] text-muted-foreground/40">
        <div className="flex gap-3">
          <span>{new Date().getUTCFullYear()}©</span>
          <span className="hidden lg:inline">
            UTC_{new Date().getUTCHours()}:00
          </span>
        </div>
        <span className="tabular-nums">
          0x{Math.random().toString(16).slice(2, 6).toUpperCase()}
        </span>
      </div>
    </div>
  )
}

// Sub-component for cleaner mapping
function TerminalLine({ line }: { line: any }) {
  if (line.type === "separator") {
    return (
      <div className="flex items-center gap-2 py-2 text-muted-foreground/30">
        <div className="h-px flex-1 bg-current" />
        <span className="text-[8px] font-bold">{line.text}</span>
        <div className="h-px flex-1 bg-current" />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex items-baseline gap-2 text-[10px] leading-tight transition-all duration-300",
        LINE_COLOR[line.type]
      )}
    >
      <span
        className={cn(
          "shrink-0 font-bold opacity-50",
          line.type === "ok" && "text-emerald-500"
        )}
      >
        {LINE_SYMBOL[line.type] || ">"}
      </span>
      <span className="break-all">{line.text}</span>
    </div>
  )
}
