import React, {createContext, useRef} from 'react'
import useDebounce from 'react-captain/useDebounce'
import classNames from 'classnames'
import assign from 'lodash/assign'
import noop from 'lodash/fp/noop'
import isNull from 'lodash/fp/isNull'
import cloneDeep from 'lodash/fp/cloneDeep'

import {FormContext as Context, FormProps} from './types'

export default function<T>(defaultModel: T | null) {
  const FormContext = createContext<Context<T>>([defaultModel, noop])
  const submitRef = useRef<HTMLButtonElement | null>(null)

  function Form(props: FormProps<T>) {
    const model = useRef(cloneDeep(defaultModel))
    const debounce = useDebounce()
    const triggerFormChange = debounce(props.onChange || noop)
    const submit = props.onSubmit || noop

    function setModelPart<U>(key: keyof T, value: U) {
      if (!isNull(model.current)) {
        assign(model.current, {[key]: value})
        triggerFormChange(model.current)
      }
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault()
      if (!model.current) return

      try {
        await submit(model.current)
      } catch (error) {
        console.error(error.toString())
      }
    }

    return (
      <FormContext.Provider value={[defaultModel, setModelPart]}>
        <form className={classNames(props.className)} onSubmit={handleSubmit}>
          {props.children}
          <button type="submit" ref={submitRef} style={{display: 'none'}} />
        </form>
      </FormContext.Provider>
    )
  }

  function submit() {
    if (submitRef.current) {
      submitRef.current.click()
    }
  }

  return {FormContext, Form, submit}
}
