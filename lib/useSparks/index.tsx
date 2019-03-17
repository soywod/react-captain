import React, {RefObject, useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import isArray from 'lodash/isArray'
import isNull from 'lodash/isNull'

import Spark from './Spark'

// ------------------------------------------------------------------- # Types #

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type Range = number | [number, number]

export type SparksOptions = {
  ref: RefObject<HTMLElement>
  shapes: JSX.Element | JSX.Element[]
  velocity?: [Range, Range]
  gravity?: number
  quantity?: number
  duration?: number
  mass?: number
  wind?: [number, number]
  mode?: 'stream' | 'realtime'
}

type SparksOptionsFull = {
  ref: RefObject<HTMLElement>
  shapes: JSX.Element | JSX.Element[]
  velocity: [Range, Range]
  gravity: number
  quantity: number
  duration: number
  mass: number
  wind: [number, number]
  mode: 'stream' | 'realtime'
}

export const defaultOptions: Omit<SparksOptionsFull, 'ref' | 'shapes'> = {
  velocity: [[1, 10], [17, 23]],
  gravity: 2,
  quantity: 10,
  duration: 1000,
  mass: 0.96,
  wind: [0, 0],
  mode: 'stream',
}

// -------------------------------------------------------------------- # Hook #

export default function(userOptions: SparksOptions) {
  const options: SparksOptionsFull = {...defaultOptions, ...userOptions}
  const {ref, velocity, gravity, quantity, duration, mass, wind, mode} = options
  const shapes = isArray(options.shapes) ? options.shapes : [options.shapes]
  const status = useState(false)
  const [isOn, setOn] = status

  useEffect(() => {
    if (isNull(ref.current) || !isOn) return

    const {width, height} = ref.current.getBoundingClientRect()
    const x = ref.current.offsetLeft + width * 0.5
    const y = ref.current.offsetTop + height * 0.5

    switch (mode) {
      case 'stream':
        const timeout = setInterval(() => renderSpark(x, y), 1000 / quantity)
        return () => clearInterval(timeout)

      case 'realtime':
        for (let i = 0; i < quantity; i++) {
          setTimeout(() => renderSpark(x, y), 0)
        }

        setOn(false)
    }
  }, [ref.current, isOn, userOptions])

  function renderSpark(x: number, y: number) {
    const mount = document.createElement('div')

    ReactDOM.render(
      <Spark
        origin={{x, y}}
        shapes={shapes}
        velocity={velocity}
        gravity={gravity}
        duration={duration}
        mass={mass}
        wind={wind}
      />,
      mount,
      () => {
        if (ref.current && mount.firstChild) {
          document.body.appendChild(mount.firstChild)
        }
      },
    )
  }

  return status
}
