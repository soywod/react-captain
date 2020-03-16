import {useCallback, useEffect} from "react"

import {UseClickOutside} from "./click-outside.types"

export const useClickOutside: UseClickOutside = params => {
  const ref = params.ref
  const type = params.listenerType || "click"
  const opts = params.listenerOpts || {passive: true}
  const listener = useCallback(
    (evt: Event) => {
      if (ref.current && evt.target) {
        const target = evt.target as Node
        const isSameOrigin = ref.current.isEqualNode(target)
        const containsRef = ref.current.contains(target)
        !isSameOrigin && !containsRef && params.listener(evt)
      }
    },
    [params, ref],
  )

  useEffect(() => {
    document.addEventListener(type, listener, opts)
    return () => document.removeEventListener(type, listener, opts)
  }, [listener, opts, type])
}

export default useClickOutside
