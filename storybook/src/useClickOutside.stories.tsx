import React, {useRef} from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import useClickOutside from '../../lib/useClickOutside'

// ---------------------------------------------------------- # Demo component #

function Demo() {
  const ref = useRef<HTMLDivElement | null>(null)
  const handleClickOutside = useClickOutside(ref)

  handleClickOutside(action('Clicked outside of green area!'))

  return (
    <div style={{width: 300, height: 300, background: 'blue'}}>
      <div ref={ref} style={{width: 200, height: 200, background: 'green'}}>
        <div style={{width: 100, height: 100, background: 'yellow'}} />
      </div>
    </div>
  )
}

// ----------------------------------------------------------------- # Stories #

storiesOf('useClickOutside', module).add('Default', () => {
  return <Demo />
})
