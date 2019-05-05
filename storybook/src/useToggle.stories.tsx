import React from 'react'
import {storiesOf} from '@storybook/react'

import useToggle from '../../lib/useToggle'

// ----------------------------------------------------------------- # Stories #

storiesOf('useToggle', module).add('Default', () => {
  function Demo() {
    const [toggleOn, toggle] = useToggle()

    function resetToggle() {
      toggle(false)
    }

    return (
      <div>
        Status: {toggleOn ? 'ON' : 'OFF'}
        <button onClick={toggle}>Toggle</button>
        <button onClick={resetToggle}>Reset toggle</button>
      </div>
    )
  }

  return <Demo />
})
