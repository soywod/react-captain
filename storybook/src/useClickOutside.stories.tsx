import React, {useRef} from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import useClickOutside from '../../lib/useClickOutside'

storiesOf('useClickOutside', module).add('Default', () => {
  function Demo() {
    const ref1 = useRef<HTMLDivElement | null>(null)
    const ref2 = useRef<HTMLDivElement | null>(null)

    const handleClickOutside = useClickOutside(ref1)
    handleClickOutside(action('Clicked outside of the blue area!'))

    useClickOutside(ref2, action('Clicked outside of the green area!'))

    return (
      <div ref={ref1} style={{width: 300, height: 300, background: 'blue'}}>
        <div ref={ref2} style={{width: 200, height: 200, background: 'green'}}>
          <div style={{width: 100, height: 100, background: 'yellow'}} />
        </div>
      </div>
    )
  }

  return <Demo />
})
