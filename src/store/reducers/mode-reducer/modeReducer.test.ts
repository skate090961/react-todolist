import {modeReducer, toggleModeAC} from "./modeReducer";

test('mode should be changed', () => {
    const startState = {
        isDarkMode: false
    }
    const firstToggle = modeReducer(startState, toggleModeAC())
    const secondToggle = modeReducer(firstToggle, toggleModeAC())

    expect(firstToggle.isDarkMode).toBeTruthy()
    expect(secondToggle.isDarkMode).toBeFalsy()
})