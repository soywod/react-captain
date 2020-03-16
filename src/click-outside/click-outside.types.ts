import React from "react"

export type ClickOutside = (
  ref: React.RefObject<HTMLElement>,
  listener: (evt: Event) => void,
  listenerOpts?: Partial<ClickOutsideListenerOpts>,
) => void

export type ClickOutsideListenerOpts = {
  type: keyof DocumentEventMap
  opts: boolean | AddEventListenerOptions
}

export const defaultOpts: ClickOutsideListenerOpts = {
  type: "click",
  opts: {passive: true},
}
