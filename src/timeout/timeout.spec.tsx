import "@testing-library/jest-dom"

import React, {FC} from "react"
import {render} from "@testing-library/react"

import useTimeout from "./timeout"

it("should timeout", async () => {
  const handler = jest.fn()
  const TestComponent: FC = () => {
    const handleClick = useTimeout(handler, {persist: true})
    return <button data-testid="timeout" onClick={handleClick} />
  }

  const {getByTestId} = render(<TestComponent />)
  getByTestId("timeout").click()
  getByTestId("timeout").click()
  getByTestId("timeout").click()
  expect(handler).not.toHaveBeenCalled()
  jest.runAllTimers()
  expect(handler).toHaveBeenCalledTimes(3)
})

it("should abort", async () => {
  const handler = jest.fn()
  const TestComponent: FC = () => {
    const handleClick = useTimeout(handler, 1000)
    return (
      <>
        <button data-testid="timeout" onClick={() => handleClick()} />
        <button data-testid="abort" onClick={() => handleClick.abort()} />
      </>
    )
  }

  const {getByTestId} = render(<TestComponent />)
  getByTestId("timeout").click()
  getByTestId("timeout").click()
  getByTestId("timeout").click()
  expect(handler).not.toHaveBeenCalled()
  getByTestId("abort").click()
  jest.runAllTimers()
  expect(handler).not.toHaveBeenCalled()
})

it("should terminate", async () => {
  const handler = jest.fn()
  const TestComponent: FC = () => {
    const handleClick = useTimeout(handler)
    return (
      <>
        <button data-testid="timeout" onClick={() => handleClick()} />
        <button data-testid="terminate" onClick={() => handleClick.terminate()} />
      </>
    )
  }

  const {getByTestId} = render(<TestComponent />)
  getByTestId("timeout").click()
  getByTestId("timeout").click()
  getByTestId("timeout").click()
  expect(handler).not.toHaveBeenCalled()
  getByTestId("terminate").click()
  expect(handler).toHaveBeenCalledTimes(3)
  handler.mockReset()
  jest.runAllTimers()
  expect(handler).not.toHaveBeenCalled()
})
