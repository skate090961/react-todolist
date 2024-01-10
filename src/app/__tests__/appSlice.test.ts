import { appMock } from "../../common/mocks/appMock"
import { appSlice, setAppErrorMessageAC, setAppIsInitializedAC, setAppStatusAC, toggleAppModeAC } from "../appSlice"

let startState: any

beforeEach(() => {
  startState = appMock
})

test("mode should be changed", () => {
  const firstToggle = appSlice(startState, toggleAppModeAC())
  const secondToggle = appSlice(firstToggle, toggleAppModeAC())
  expect(firstToggle.isDarkMode).toBeTruthy()
  expect(secondToggle.isDarkMode).toBeFalsy()
})

test("correct error message should be set", () => {
  const endState = appSlice(startState, setAppErrorMessageAC({ error: "some error" }))
  expect(endState.error).toBe("some error")
})

test("correct status should be set", () => {
  const endState = appSlice(startState, setAppStatusAC({ status: "loading" }))
  expect(endState.status).toBe("loading")
})

test("initialized status should be changed", () => {
  const endState = appSlice(startState, setAppIsInitializedAC({ isInitialized: true }))
  expect(endState.isInitialized).toBeTruthy()
})
