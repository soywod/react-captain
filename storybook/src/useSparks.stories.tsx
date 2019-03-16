import React, {useRef} from 'react'
import {storiesOf} from '@storybook/react'

import useSparks from '../../lib/useSparks'

// ---------------------------------------------------------- # Demo component #

function Demo() {
  const ref = useRef<HTMLDivElement | null>(null)
  useSparks(ref)

  return (
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
  )
}

// ----------------------------------------------------------------- # Stories #

storiesOf('useSparks', module).add('Default', () => {
  return <Demo />
})
