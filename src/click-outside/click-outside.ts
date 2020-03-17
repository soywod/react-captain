import {useEffect} from "react"

import {
  ClickOutside,
  ClickOutsideListener,
  ClickOutsideOpts,
  defaultOpts,
} from "./click-outside.types"

const isOutside = (target: EventTarget | null, source: EventTarget | null) => {
  if (!(target instanceof Node)) return false
  if (!(source instanceof Node)) return false
  if (source.isEqualNode(target)) return false
  if (source.contains(target)) return false
  return true
}

const useClickOutside: ClickOutside = (ref, callback, overrideOpts = {}) => {
  const opts: ClickOutsideOpts = {...defaultOpts, ...overrideOpts}

  useEffect(() => {
    const currRoot = opts.root.current || document
    const listener: ClickOutsideListener = evt => {
      const isBetweenRootAndTarget = [ref, ...opts.except].every(el => {
        const isInsideRoot = !isOutside(evt.target, currRoot)
        const isOutsideOfTarget = isOutside(evt.target, el.current)
        return isInsideRoot && isOutsideOfTarget
      })

      if (isBetweenRootAndTarget) {
        callback(evt)
      }
    }

    currRoot.addEventListener(opts.listenerType, listener, opts.listenerOpts)
    return () => currRoot.removeEventListener(opts.listenerType, listener, opts.listenerOpts)
  }, [callback, opts, ref])
}

export default useClickOutside
