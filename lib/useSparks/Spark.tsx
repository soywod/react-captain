import React, {CSSProperties, useEffect, useRef, useState} from 'react'
import {useSpring, interpolate, animated} from 'react-spring'
import isArray from 'lodash/isArray'
import last from 'lodash/last'
import random from 'lodash/random'
import range from 'lodash/range'

// ------------------------------------------------------------- # Basic types #

type Range = [number, number]

// ------------------------------------------------------------------- # Props #

type Props = {
  origin: [number, number]
  shapes: JSX.Element[]
  velocity: [number | Range, number | Range]
  gravity: number
  duration: number
  mass: number
  wind: [number, number]
}

// --------------------------------------------------------------- # Component #

const SAMPLE_SIZE = 20

export default function(props: Props) {
  const {velocity, gravity, duration, mass, wind, shapes} = props

  const ref = useRef<HTMLSpanElement | null>(null)
  const [left, setLeft] = useState(0)
  const [top, setTop] = useState(0)

  useEffect(() => {
    if (ref.current) {
      const {width, height} = ref.current.getBoundingClientRect()
      setLeft(props.origin[0] - width / 2)
      setTop(props.origin[1] - height / 2)
    }
  }, [ref.current])

  const velocityX = isArray(velocity[0]) ? random(...velocity[0]) : velocity[0]
  const velocityY = isArray(velocity[1]) ? random(...velocity[1]) : velocity[1]
  const randomZ = random(1, 25)
  const direction = velocityX / Math.abs(velocityX)

  const {x, y, z, opacity} = useSpring({
    from: {
      x: 0,
      y: 0,
      z: 0,
      opacity: 1,
    },
    x: 1,
    y: 1,
    z: randomZ,
    opacity: 0,
    config: {duration},
    onRest: () => {
      if (ref.current && ref.current.remove) {
        ref.current.remove()
      }
    },
  })

  const transform = interpolate(
    [
      x.interpolate({
        range: generateRange(),
        output: generateOutputX(velocityX, wind[0], mass),
      }),
      y.interpolate({
        range: generateRange(),
        output: generateOutputY(velocityY, wind[1], gravity),
      }),
      z.interpolate({
        range: [0, 1],
        output: [0, randomZ],
      }),
    ],
    (x, y, z) => `translate(${x}px, ${y}px) rotateZ(${z * direction}deg)`,
  )

  const style: CSSProperties = {
    pointerEvents: 'none',
    position: 'absolute',
    display: ref.current ? 'inline-block' : 'none',
    left,
    top,
    opacity,
    transform,
  }

  return (
    <animated.span ref={ref} style={style}>
      {shapes[random(0, shapes.length - 1)]}
    </animated.span>
  )
}

// --------------------------------------------------------- # Physics helpers #

function generateOutputX(velocityX: number, windX: number, mass: number) {
  let delta = velocityX

  return range(SAMPLE_SIZE).reduce(
    output => {
      delta *= mass
      delta -= windX

      return [...output, Number(last(output)) + delta]
    },
    [0],
  )
}

function generateOutputY(velocityY: number, windY: number, gravity: number) {
  let delta = velocityY

  return range(SAMPLE_SIZE).reduce(
    output => {
      delta -= gravity + windY
      return [...output, Number(last(output)) - delta]
    },
    [0],
  )
}

function generateRange() {
  const delta = 1 / SAMPLE_SIZE
  const initialRange: number[] = []

  const midRange = range(SAMPLE_SIZE - 1).reduce(
    (output, val) => [...output, (val + 1) * delta],
    initialRange,
  )

  return [0, ...midRange, 1]
}
