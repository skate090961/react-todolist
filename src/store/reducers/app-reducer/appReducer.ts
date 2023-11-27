const initialState = {
    isDarkMode: false as boolean,
    status: 'idle' as RequestStatusType,
    error: null as null | string
} as const

export const appReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
    switch (action.type) {
        case 'APP/TOGGLE-MODE':
            return {...state, isDarkMode: !state.isDarkMode}
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR-MESSAGE':
            return {...state, error: action.error}
        default:
            return state
    }
}

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppStateType = typeof initialState
type ActionsType = ReturnType<typeof toggleAppModeAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorMessageAC>

//action
export const toggleAppModeAC = () => ({type: 'APP/TOGGLE-MODE'} as const)
export const setAppErrorMessageAC = (error: string | null) => ({type: 'APP/SET-ERROR-MESSAGE', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)