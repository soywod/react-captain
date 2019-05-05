import React from 'react'
import {storiesOf} from '@storybook/react'

import useStoredState from '../../lib/useStoredState'

// ----------------------------------------------------------------- # Stories #

storiesOf('useStoredState', module).add('Default', () => {
  function Demo() {
    const [stringVal, setString] = useStoredState<string>('string')
    const [numberVal, setNumber] = useStoredState<number>('number')
    const [objectVal, setObject] = useStoredState<{value: number}>('object')

    function reset() {
      setString(null)
      setNumber(null)
      setObject(null)
    }

    return (
      <table>
        <tbody>
          <tr>
            <td>String</td>
            <td>
              <input
                onChange={event => setString(event.currentTarget.value)}
                value={stringVal || ''}
              />
            </td>
          </tr>
          <tr>
            <td>Number</td>
            <td>
              <button onClick={() => setNumber(Number(numberVal) - 1)}>
                -
              </button>
              <span> {numberVal} </span>
              <button onClick={() => setNumber(Number(numberVal) + 1)}>
                +
              </button>
            </td>
          </tr>
          <tr>
            <td>Object</td>
            <td>
              <button onClick={() => setObject({value: Math.random()})}>
                Generate object
              </button>
              <span> {JSON.stringify(objectVal)}</span>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <button onClick={reset}>Reset</button>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }

  return <Demo />
})

storiesOf('useStoredState', module).add('With default', () => {
  function Demo() {
    const [stringVal, setString] = useStoredState('string default', 'default')
    const [numberVal, setNumber] = useStoredState('number default', -1)
    const [objectVal, setObject] = useStoredState('object default', {value: 0})

    function reset() {
      setString(null)
      setNumber(null)
      setObject(null)
    }

    return (
      <table>
        <tbody>
          <tr>
            <td>String</td>
            <td>
              <input
                onChange={event => setString(event.currentTarget.value)}
                value={stringVal || ''}
              />
            </td>
          </tr>
          <tr>
            <td>Number</td>
            <td>
              <button onClick={() => setNumber(Number(numberVal) - 1)}>
                -
              </button>
              <span> {numberVal} </span>
              <button onClick={() => setNumber(Number(numberVal) + 1)}>
                +
              </button>
            </td>
          </tr>
          <tr>
            <td>Object</td>
            <td>
              <button onClick={() => setObject({value: Math.random()})}>
                Generate object
              </button>
              <span> {JSON.stringify(objectVal)}</span>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <button onClick={reset}>Reset</button>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }

  return <Demo />
})
