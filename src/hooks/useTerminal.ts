import { useQuery, useQueryClient } from "@tanstack/react-query"

const TERMINAL_KEY = ["terminal"]
const MAX_LINES = 30

type TerminalLineType = "stdout" | "stderr" | "ok" | "warn" | "separator"

type TerminalLine = {
  id: number
  text: string
  type: TerminalLineType
  timestamp: number
  tag?: string // override the auto-tag, e.g. "GDPR_SKIP"
  label?: string // left-side key, e.g. "NODE" or "CONN"
  meta?: string // dimmed trailing text, e.g. "ASN-13335"
}

export function useTerminal() {
  const queryClient = useQueryClient()

  const { data: lines = [] } = useQuery<TerminalLine[]>({
    queryKey: TERMINAL_KEY,
    queryFn: () => [],
    staleTime: Infinity,
    gcTime: Infinity,
  })

  const push = (
    text: string,
    type: TerminalLineType = "stdout",
    opts?: Pick<TerminalLine, "tag" | "label" | "meta">
  ) => {
    queryClient.setQueryData<TerminalLine[]>(TERMINAL_KEY, (prev = []) => {
      const next = [
        ...prev,
        { id: Date.now(), text, type, timestamp: Date.now(), ...opts },
      ]
      return next.length > MAX_LINES ? next.slice(-MAX_LINES) : next
    })
  }

  const clear = () => queryClient.setQueryData(TERMINAL_KEY, [])

  return { lines, push, clear }
}
