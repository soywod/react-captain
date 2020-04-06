import "@testing-library/jest-dom"

import React, {FC} from "react"
import {Subject} from "rxjs"
import {render} from "@testing-library/react"

import useSubject from "./subject"

it("should subscribe to subject", () => {
  const handler = jest.fn()
  const subject$ = new Subject<number>()
  const TestComponent: FC = () => {
    useSubject(subject$, handler)
    return null
  }

  render(<TestComponent />)
  expect(handler).toHaveBeenCalledTimes(0)

  subject$.next(0)
  expect(handler).toHaveBeenCalledTimes(1)
  expect(handler).toHaveBeenCalledWith(0)

  subject$.next(1)
  expect(handler).toHaveBeenCalledTimes(2)
  expect(handler).toHaveBeenCalledWith(1)
})
