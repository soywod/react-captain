import React, {useState} from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import useDebounce, {DebounceOptions} from '../../lib/useDebounce'

function Demo(props: Partial<DebounceOptions>) {
  const debounce = useDebounce(props)
  const actionWithDebounce = debounce(action('Action'))

  const [value, setValue] = useState('')

  function changeValue(event: React.ChangeEvent<HTMLInputElement>) {
    const nextValue = event.currentTarget.value

    setValue(nextValue)
    actionWithDebounce(nextValue)
  }

  return (
    <div>
      <input
        autoFocus
        placeholder="Type something..."
        value={value}
        onChange={changeValue}
      />

      <button onClick={actionWithDebounce}>Click me...</button>
    </div>
  )
}

// ----------------------------------------------------------------- # Stories #

storiesOf('useDebounce', module).add('Default', () => {
  return <Demo />
})

storiesOf('useDebounce', module).add('Custom delay', () => {
  return <Demo delay={1000} />
})

storiesOf('useDebounce', module).add('No persist', () => {
  return <Demo persist={false} />
})
