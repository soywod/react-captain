export type Callback = (...args: any[]) => void

export function clearTimeoutSafe(timeout: NodeJS.Timeout | null) {
  if (timeout) {
    clearTimeout(timeout)
  }
}
