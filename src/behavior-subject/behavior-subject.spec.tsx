import "@testing-library/jest-dom"

import React, {FC} from "react"
import {BehaviorSubject} from "rxjs"
import {render} from "@testing-library/react"

import useBehaviorSubject from "./behavior-subject"

it("should subscribe to behavior subject", () => {
  const subject$ = new BehaviorSubject("val")
  const subjectFn = jest.fn()
  const TestComponent: FC = () => {
    const [val, setVal] = useBehaviorSubject(subject$, subjectFn)
    return (
      <button onClick={() => setVal(val + val)} data-testid="button">
        {val}
      </button>
    )
  }

  const {getByTestId, getByText} = render(<TestComponent />)
  expect(subject$.value).toBe("val")
  expect(getByText("val")).toBeInTheDocument()
  expect(subjectFn).toHaveBeenCalledTimes(1)

  getByTestId("button").click()
  expect(subject$.value).toBe("valval")
  expect(getByText("valval")).toBeInTheDocument()
  expect(subjectFn).toHaveBeenCalledTimes(2)
  expect(subjectFn).toHaveBeenCalledWith("valval")
})
