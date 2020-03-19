import "@testing-library/jest-dom"

import React, {FC} from "react"
import {render} from "@testing-library/react"

import useDebounce from "./debounce"

it("should debounce", async () => {
  const handler = jest.fn()
  const TestComponent: FC = () => {
    const debounce = useDebounce({persist: true})
    const handleClick = debounce(handler)
    return <button data-testid="debounce" onClick={handleClick} />
  }

  const {getByTestId} = render(<TestComponent />)
  getByTestId("debounce").click()
  expect(handler).not.toHaveBeenCalled()
  jest.runAllTimers()
  expect(handler).toHaveBeenCalledTimes(1)
})

it("should abort", async () => {
  const handler = jest.fn()
  const TestComponent: FC = () => {
    const debounce = useDebounce(1000)
    const handleClick = debounce(handler)
    return (
      <>
        <button data-testid="debounce" onClick={() => handleClick()} />
        <button data-testid="abort" onClick={() => handleClick.abort()} />
      </>
    )
  }

  const {getByTestId} = render(<TestComponent />)
  getByTestId("debounce").click()
  expect(handler).not.toHaveBeenCalled()
  getByTestId("abort").click()
  jest.runAllTimers()
  expect(handler).not.toHaveBeenCalled()
})

it("should terminate", async () => {
  const handler = jest.fn()
  const TestComponent: FC = () => {
    const debounce = useDebounce()
    const handleClick = debounce(handler)
    return (
      <>
        <button data-testid="debounce" onClick={() => handleClick()} />
        <button data-testid="terminate" onClick={() => handleClick.terminate()} />
      </>
    )
  }

  const {getByTestId} = render(<TestComponent />)
  getByTestId("debounce").click()
  expect(handler).not.toHaveBeenCalled()
  getByTestId("terminate").click()
  expect(handler).toHaveBeenCalledTimes(1)
  handler.mockReset()
  jest.runAllTimers()
  expect(handler).not.toHaveBeenCalled()
})
