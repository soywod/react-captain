import React, {RefObject, useEffect} from 'react'
import ReactDOM from 'react-dom'

import Spark from './Spark'

export default function(ref: RefObject<Element>) {
  useEffect(() => {
    if (!ref.current) return

    const {top, width, left, height} = ref.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2

    const timeout = setInterval(() => {
      const mount = document.createElement('span')
      ReactDOM.render(<Spark origin={{x, y}} />, mount)

      if (ref.current && mount.firstChild) {
        document.body.appendChild(mount.firstChild)
      }
    }, 200)

    return () => clearInterval(timeout)
  })
}
