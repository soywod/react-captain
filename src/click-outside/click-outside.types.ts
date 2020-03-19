import React from "react"

/**
 * Capture click event outside of the given HTMLElement.
 *
 * @param ref   Reference to the element
 * @param fn    Callback called on ref outside click
 * @param opts  Options
 */
export type UseClickOutside = (
  ref: React.RefObject<Node>,
  fn: ClickOutsideFn,
  opts?: Partial<ClickOutsideOpts>,
) => void

export type ClickOutsideFn = (evt: Event) => void
export type ClickOutsideOpts = {
  /**
   * Highest parent where the listener will be attached to.
   *
   * @default document
   */
  root: React.RefObject<Node>

  /**
   * Blacklisted elements that will not trigger any event.
   *
   * @default []
   */
  except: React.RefObject<Node>[]

  /**
   * Listener event type.
   *
   * @default "click"
   */
  listenerType: keyof DocumentEventMap

  /**
   * Listener options.
   *
   * @default {passive: true}
   */
  listenerOpts: boolean | AddEventListenerOptions
}

export const defaultOpts: ClickOutsideOpts = {
  root: {current: null},
  except: [],
  listenerType: "click",
  listenerOpts: {passive: true},
}
