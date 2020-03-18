import "@testing-library/jest-dom"

import React, {FC, useEffect} from "react"
import {render, wait} from "@testing-library/react"
import {act} from "react-dom/test-utils"
import noop from "lodash/fp/noop"

import useStoredState from "./stored-state"
import {StoredStateState} from "./stored-state.types"

let storage: {[key: string]: unknown} = {}

jest.mock("localforage", () => ({
  createInstance: () => ({
    getItem: async (key: string) => {
      return storage[key]
    },
    setItem: async (key: string, val: unknown) => {
      storage[key] = val
    },
  }),
}))

beforeEach(() => {
  jest.resetAllMocks()
  storage = {}
})

it("should get default val if no stored val", async () => {
  const TestComponent: FC = () => {
    const [val, _, isReady] = useStoredState("key", "default-val")
    return isReady ? <div data-testid="key">{val}</div> : null
  }

  const {getByTestId, getByText} = render(<TestComponent />)
  await wait(() => getByTestId("key"))
  expect(getByText("default-val")).toBeInTheDocument()
  expect(storage.key).toBe("default-val")
})

it("should get stored val if exists", async () => {
  storage.key = "stored-val"

  const TestComponent: FC = () => {
    const [val, _, isReady] = useStoredState("key", "default-val")
    return isReady ? <div data-testid="key">{val}</div> : null
  }

  const {getByTestId, getByText} = render(<TestComponent />)
  await wait(() => getByTestId("key"))
  expect(getByText("stored-val")).toBeInTheDocument()
  expect(storage.key).toBe("stored-val")
})

it("should get undefined if default val = undefined", async () => {
  const TestComponent: FC = () => {
    const [val, _, isReady] = useStoredState<string | undefined>("key", undefined)
    return isReady ? <div data-testid="key">{String(val)}</div> : null
  }

  const {getByTestId, getByText} = render(<TestComponent />)
  await wait(() => getByTestId("key"))
  expect(getByText("undefined")).toBeInTheDocument()
  expect(storage.key).toBeUndefined()
})

it("should get null if default val = null", async () => {
  const TestComponent: FC = () => {
    const [val, _, isReady] = useStoredState<string | null>("key", null)
    return isReady ? <div data-testid="key">{String(val)}</div> : null
  }

  const {getByTestId, getByText} = render(<TestComponent />)
  await wait(() => getByTestId("key"))
  expect(getByText("null")).toBeInTheDocument()
  expect(storage.key).toBeNull()
})

it("should set val", async () => {
  let setVal: (val: string) => Promise<void>
  storage.key = "stored-val"

  const TestComponent: FC<{set: (set: StoredStateState<string>[1]) => void}> = props => {
    const [val, setVal, isReady] = useStoredState("key", "default-val")

    useEffect(() => {
      if (!isReady) {
        props.set(setVal)
      }
    }, [isReady, props, setVal])

    return isReady ? <div data-testid="key">{val}</div> : null
  }

  // Render component and check val from store
  const {getByTestId, getByText, rerender} = render(<TestComponent set={set => (setVal = set)} />)
  await wait(() => getByTestId("key"))
  expect(getByText("stored-val")).toBeInTheDocument()
  expect(storage.key).toBe("stored-val")

  // Update stored val
  await act(() => setVal("stored-val-updated"))
  expect(getByText("stored-val-updated")).toBeInTheDocument()
  expect(storage.key).toBe("stored-val-updated")

  // Re-render and check default val from store
  rerender(<TestComponent set={noop} />)
  await wait(() => getByTestId("key"))
  expect(getByText("stored-val-updated")).toBeInTheDocument()
  expect(storage.key).toBe("stored-val-updated")
})
