import React, {CSSProperties, useRef, useState} from 'react'
import {storiesOf} from '@storybook/react'

import useSparks from '../../lib/useSparks'

// -------------------------------------------------------- # Spark components #

type Props = {color: string}

function Star(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill={props.color}
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      />
    </svg>
  )
}

function StarOutline(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill={props.color}
        d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"
      />
    </svg>
  )
}

// ---------------------------------------------------------- # Demo component #

function Demo() {
  const ref = useRef<HTMLButtonElement | null>(null)
  const [velocityMinX, setVectorMinX] = useState(-10)
  const [velocityMaxX, setVectorMaxX] = useState(10)
  const [velocityMinY, setVectorMinY] = useState(17)
  const [velocityMaxY, setVectorMaxY] = useState(23)
  const [gravity, setGravity] = useState(2)
  const [quantity, setQuantity] = useState(10)
  const [duration, setDuration] = useState(1000)
  const [mass, setMass] = useState(0.96)
  const [windX, setWindX] = useState(0)
  const [windY, setWindY] = useState(0)
  const [mode, setMode] = useState<'stream' | 'chunk'>('chunk')

  const [enabled, switchOn] = useSparks({
    ref,
    velocity: [[velocityMinX, velocityMaxX], [velocityMinY, velocityMaxY]],
    gravity,
    quantity,
    duration,
    mass,
    wind: [windX, windY],
    mode,
    shapes: [
      <Star color="#e91e63" />,
      <Star color="#2196f3" />,
      <Star color="#ff9800" />,
      <Star color="#4caf50" />,
      <StarOutline color="#673ab7" />,
    ],
  })

  function changeVectorMinX(event: React.ChangeEvent<HTMLInputElement>) {
    setVectorMinX(Number(event.target.value))
  }

  function changeVectorMaxX(event: React.ChangeEvent<HTMLInputElement>) {
    setVectorMaxX(Number(event.target.value))
  }

  function changeVectorMinY(event: React.ChangeEvent<HTMLInputElement>) {
    setVectorMinY(Number(event.target.value))
  }

  function changeVectorMaxY(event: React.ChangeEvent<HTMLInputElement>) {
    setVectorMaxY(Number(event.target.value))
  }

  function changeGravity(event: React.ChangeEvent<HTMLInputElement>) {
    setGravity(Number(event.target.value))
  }

  function changeQuantity(event: React.ChangeEvent<HTMLInputElement>) {
    setQuantity(Number(event.target.value))
  }

  function changeDuration(event: React.ChangeEvent<HTMLInputElement>) {
    setDuration(Number(event.target.value))
  }

  function changeMass(event: React.ChangeEvent<HTMLInputElement>) {
    setMass(Number(event.target.value))
  }

  function changeWindX(event: React.ChangeEvent<HTMLInputElement>) {
    setWindX(Number(event.target.value))
  }

  function changeWindY(event: React.ChangeEvent<HTMLInputElement>) {
    setWindY(Number(event.target.value))
  }

  function changeMode(event: React.ChangeEvent<HTMLInputElement>) {
    setMode(event.target.checked ? 'stream' : 'chunk')
  }

  const container: CSSProperties = {
    width: 400,
    height: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const col: CSSProperties = {display: 'flex'}
  const row: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 16,
  }

  return (
    <div>
      <div style={container}>
        <button ref={ref} onClick={() => switchOn(!enabled)}>
          Click me...
        </button>
      </div>

      <div style={col}>
        <div style={row}>
          <div>VelocityX min: {velocityMinX}</div>
          <div>
            <input
              type="range"
              min={-50}
              max={50}
              value={velocityMinX}
              onChange={changeVectorMinX}
            />
          </div>

          <div>VelocityX max: {velocityMaxX}</div>
          <div>
            <input
              type="range"
              min={-50}
              max={50}
              value={velocityMaxX}
              onChange={changeVectorMaxX}
            />
          </div>
        </div>

        <div style={row}>
          <div>VelocityY min: {velocityMinY}</div>
          <div>
            <input
              type="range"
              min={-50}
              max={50}
              value={velocityMinY}
              onChange={changeVectorMinY}
            />
          </div>

          <div>VelocityY max: {velocityMaxY}</div>
          <div>
            <input
              type="range"
              min={-50}
              max={50}
              value={velocityMaxY}
              onChange={changeVectorMaxY}
            />
          </div>
        </div>

        <div style={row}>
          <div>Quantity: {quantity}</div>
          <div>
            <input
              type="range"
              min={1}
              max={300}
              value={quantity}
              onChange={changeQuantity}
            />
          </div>

          <div>Duration: {duration}</div>
          <div>
            <input
              type="range"
              min={100}
              max={3000}
              value={duration}
              onChange={changeDuration}
            />
          </div>
        </div>

        <div style={row}>
          <div>Gravity: {gravity}</div>
          <div>
            <input
              type="range"
              min={0}
              max={10}
              step={0.1}
              value={gravity}
              onChange={changeGravity}
            />
          </div>

          <div>Mass factor: {mass}</div>
          <div>
            <input
              type="range"
              min={0.8}
              max={1}
              step={0.01}
              value={mass}
              onChange={changeMass}
            />
          </div>
        </div>

        <div style={row}>
          <div>WindX: {windX}</div>
          <div>
            <input
              type="range"
              min={-5}
              max={5}
              step={0.1}
              value={windX}
              onChange={changeWindX}
            />
          </div>

          <div>WindY: {windY}</div>
          <div>
            <input
              type="range"
              min={-5}
              max={5}
              step={0.1}
              value={windY}
              onChange={changeWindY}
            />
          </div>
        </div>

        <div style={row}>
          <label>
            <input
              type="checkbox"
              checked={mode === 'stream'}
              onChange={changeMode}
            />
            Mode: {mode}
          </label>
          <div />
        </div>
      </div>
    </div>
  )
}

// ----------------------------------------------------------------- # Stories #

storiesOf('useSparks', module).add('Default', () => {
  return <Demo />
})
