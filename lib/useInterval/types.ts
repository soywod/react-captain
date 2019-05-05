type BaseIntervalOptions = {
  delay?: number
  autoStart?: boolean
}

export type IntervalCallback = () => void
export type IntervalOptions = number | BaseIntervalOptions
