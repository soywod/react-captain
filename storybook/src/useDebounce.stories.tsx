import React, {useState} from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import useDebounce, {DebounceOptions} from '../../lib/useDebounce'

// ------------------------------------------------------------------- # Types #

type Props = {
  options?: Partial<DebounceOptions>
}

// ---------------------------------------------------------- # Demo component #

function Demo(props: Props) {
  const {options} = props
  const debounce = options ? useDebounce(options) : useDebounce()
  const actionWithDebounce = debounce(action('Text changed'))

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
    </div>
  )
}

// ----------------------------------------------------------------- # Stories #

storiesOf('useDebounce', module).add('Default', () => {
  return <Demo />
})

storiesOf('useDebounce', module).add('Custom delay', () => {
  return <Demo options={{delay: 1000}} />
})
