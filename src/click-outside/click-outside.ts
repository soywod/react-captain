import {useCallback, useEffect} from "react"

import {ClickOutside, defaultOpts} from "./click-outside.types"

export const useClickOutside: ClickOutside = (ref, listener, userOpts = {}) => {
  const {type, opts} = {...defaultOpts, ...userOpts}
  const _listener = useCallback(
    (evt: Event) => {
      if (ref.current && evt.target) {
        const target = evt.target as Node
        const isSameOrigin = ref.current.isEqualNode(target)
        const containsRef = ref.current.contains(target)
        !isSameOrigin && !containsRef && listener(evt)
      }
    },
    [listener, ref],
  )

  useEffect(() => {
    document.addEventListener(type, _listener, opts)
    return () => document.removeEventListener(type, _listener, opts)
  }, [_listener, opts, type])
}

export default useClickOutside
