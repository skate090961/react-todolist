type ModeType = {
    isDarkMode: boolean
}

const modeState = {
    isDarkMode: false
}

export const modeReducer = (state: ModeType = modeState, action: ReturnType<typeof toggleModeAC>): ModeType => {
    switch (action.type) {
        case 'TOGGLE-MODE':
            return {...state, isDarkMode: !state.isDarkMode}
        default:
            return state
    }
}

export const toggleModeAC = () => ({type: 'TOGGLE-MODE'})