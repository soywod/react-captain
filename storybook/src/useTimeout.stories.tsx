import React, {useState} from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import useTimeout, {TimeoutOptions} from '../../lib/useTimeout'

// ---------------------------------------------------------- # Demo component #

function Demo(props: Partial<TimeoutOptions>) {
  const timeout = useTimeout(props)
  const actionWithTimeout = timeout(action('Action'))

  const [value, setValue] = useState('')

  function changeValue(event: React.ChangeEvent<HTMLInputElement>) {
    const nextValue = event.currentTarget.value

    setValue(nextValue)
    actionWithTimeout(nextValue)
  }

  return (
    <div>
      <input
        autoFocus
        placeholder="Type something..."
        value={value}
        onChange={changeValue}
      />

      <button onClick={actionWithTimeout}>Click me...</button>
    </div>
  )
}

// ----------------------------------------------------------------- # Stories #

storiesOf('useTimeout', module).add('Default', () => {
  return <Demo />
})

storiesOf('useTimeout', module).add('Custom delay', () => {
  return <Demo delay={1000} />
})

storiesOf('useTimeout', module).add('No persist', () => {
  return <Demo persist={false} />
})
