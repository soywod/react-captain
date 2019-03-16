import React, {RefObject, useEffect} from 'react'
import ReactDOM from 'react-dom'

import Spark from './Spark'

// ------------------------------------------------------------------- # Types #

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export type SparksOptions = {
  ref: RefObject<Element>
  velocity?: [number, number]
  gravity?: number
  quantity?: number
}

type SparksOptionsFull = {
  ref: RefObject<Element>
  velocity: [number, number]
  gravity: number
  quantity: number
}

export const defaultOptions: Omit<SparksOptionsFull, 'ref'> = {
  velocity: [10, 20],
  gravity: 2,
  quantity: 20,
}

// -------------------------------------------------------------------- # Hook #

export default function(userOptions: SparksOptions) {
  const options: SparksOptionsFull = {...defaultOptions, ...userOptions}
  const {ref, velocity, gravity, quantity} = options

  useEffect(() => {
    if (!ref.current) return

    const {top, width, left, height} = ref.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2

    const timeout = setInterval(() => {
      const mount = document.createElement('div')
      ReactDOM.render(
        <Spark origin={{x, y}} velocity={velocity} gravity={gravity} />,
        mount,
      )

      if (ref.current && mount.firstChild) {
        document.body.appendChild(mount.firstChild)
      }
    }, 2000 / quantity)

    return () => clearInterval(timeout)
  }, [ref.current, userOptions])
}
