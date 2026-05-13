import { useQuery, useQueryClient } from "@tanstack/react-query"

const TERMINAL_KEY = ["terminal"]
const MAX_LINES = 40
const SESSION_START = Date.now()

export type TerminalLineType =
  | "stdout"
  | "stderr"
  | "ok"
  | "warn"
  | "separator"
  | "system"

export type TerminalLine = {
  id: string
  text: string
  type: TerminalLineType
  timestamp: string
  label?: string
  meta?: string
  status?: string
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
    opts?: Pick<TerminalLine, "label" | "meta" | "status">
  ) => {
    queryClient.setQueryData<TerminalLine[]>(TERMINAL_KEY, (prev = []) => {
      const elapsedSeconds = (Date.now() - SESSION_START) / 1000

      const newLine: TerminalLine = {
        id: crypto.randomUUID(),
        text,
        type,
        timestamp: elapsedSeconds.toFixed(6),
        ...opts,
      }
      const next = [...prev, newLine]
      return next.length > MAX_LINES ? next.slice(-MAX_LINES) : next
    })
  }

  const clear = () => queryClient.setQueryData(TERMINAL_KEY, [])

  return { lines, push, clear }
}
