import React, {useRef, useState} from 'react'
import {storiesOf} from '@storybook/react'

import useSparks from '../../lib/useSparks'

// ---------------------------------------------------------- # Demo component #

function Star(props: {color: string}) {
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

function StarOutline(props: {color: string}) {
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

function Demo() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [velocityX, setVectorX] = useState(10)
  const [velocityY, setVectorY] = useState(20)
  const [gravity, setGravity] = useState(2)
  const [quantity, setQuantity] = useState(20)
  const [duration, setDuration] = useState(1000)
  const [mass, setMass] = useState(0.96)
  const [windX, setWindX] = useState(0)
  const [windY, setWindY] = useState(0)

  useSparks({
    ref,
    velocity: [velocityX, velocityY],
    gravity,
    quantity,
    duration,
    mass,
    wind: [windX, windY],
    shapes: [
      <Star color="#e91e63" />,
      <Star color="#2196f3" />,
      <Star color="#ff9800" />,
      <Star color="#4caf50" />,
      <StarOutline color="#673ab7" />,
    ],
  })

  function changeVectorX(event: React.ChangeEvent<HTMLInputElement>) {
    setVectorX(Number(event.target.value))
  }

  function changeVectorY(event: React.ChangeEvent<HTMLInputElement>) {
    setVectorY(Number(event.target.value))
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

  return (
    <div>
      <div
        style={{
          width: 400,
          height: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div ref={ref} style={{width: 20, height: 20, background: 'blue'}} />
      </div>

      <div style={{display: 'flex'}}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div>VelocityX: {velocityX}</div>
          <div>
            <input
              type="range"
              min={1}
              max={100}
              value={velocityX}
              onChange={changeVectorX}
            />
          </div>

          <div>VelocityY: {velocityY}</div>
          <div>
            <input
              type="range"
              min={-50}
              max={50}
              value={velocityY}
              onChange={changeVectorY}
            />
          </div>

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
        </div>

        <div style={{display: 'flex', flexDirection: 'column'}}>
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

        <div style={{display: 'flex', flexDirection: 'column'}}>
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
      </div>
    </div>
  )
}

// ----------------------------------------------------------------- # Stories #

storiesOf('useSparks', module).add('Default', () => {
  return <Demo />
})
