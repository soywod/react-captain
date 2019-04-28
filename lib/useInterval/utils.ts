export function clearIntervalSafe(timeout: NodeJS.Timeout | null) {
  if (timeout) {
    clearInterval(timeout)
  }
}
