import {
    appReducer,
    AppStateType,
    setAppErrorMessageAC,
    setAppIsInitializedAC,
    setAppStatusAC,
    toggleAppModeAC
} from "./appReducer";
import {appMock} from "../../../mocks/appMock";

let startState: AppStateType;

beforeEach(() => {
    startState = appMock
})

test('mode should be changed', () => {
    const firstToggle = appReducer(startState, toggleAppModeAC())
    const secondToggle = appReducer(firstToggle, toggleAppModeAC())
    expect(firstToggle.isDarkMode).toBeTruthy()
    expect(secondToggle.isDarkMode).toBeFalsy()
})

test('correct error message should be set', () => {
    const endState = appReducer(startState, setAppErrorMessageAC('some error'))
    expect(endState.error).toBe('some error')
})

test('correct status should be set', () => {
    const endState = appReducer(startState, setAppStatusAC('loading'))
    expect(endState.status).toBe('loading')
})

test('initialized status should be changed', () => {
    const endState = appReducer(startState, setAppIsInitializedAC(true))
    expect(endState.isInitialized).toBeTruthy()
})