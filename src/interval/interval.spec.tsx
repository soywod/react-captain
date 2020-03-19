import "@testing-library/jest-dom"

import React, {FC} from "react"
import {render} from "@testing-library/react"

import useInterval from "./interval"

it("should toggle interval", async () => {
  const handler = jest.fn()
  const TestComponent: FC = () => {
    const [isOn, toggle] = useInterval(handler)
    return (
      <button data-testid="interval" onClick={toggle}>
        {isOn ? "ON" : "OFF"}
      </button>
    )
  }

  const {getByTestId, getByText} = render(<TestComponent />)
  expect(getByText("OFF")).toBeInTheDocument()

  getByTestId("interval").click()
  jest.runTimersToTime(5000)
  expect(getByText("ON")).toBeInTheDocument()

  getByTestId("interval").click()
  expect(getByText("OFF")).toBeInTheDocument()

  expect(handler).toHaveBeenCalledTimes(5)
})

it("should auto start interval with custom delay", async () => {
  const handler = jest.fn()
  const TestComponent: FC = () => {
    const [isOn, toggle] = useInterval(handler, {delay: 10, autoStart: true})
    return (
      <button data-testid="interval" onClick={toggle}>
        {isOn ? "ON" : "OFF"}
      </button>
    )
  }

  const {getByTestId, getByText} = render(<TestComponent />)
  expect(getByText("ON")).toBeInTheDocument()
  jest.runTimersToTime(50)
  getByTestId("interval").click()
  expect(getByText("OFF")).toBeInTheDocument()
  expect(handler).toHaveBeenCalledTimes(5)
})
