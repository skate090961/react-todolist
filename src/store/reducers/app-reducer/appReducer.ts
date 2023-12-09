import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    isDarkMode: false as boolean,
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false as boolean
} as const

const sliceApp = createSlice({
    name: 'app',
    initialState,
    reducers: {
        toggleAppModeAC: (state) => {
            state.isDarkMode = !state.isDarkMode
        },
        setAppErrorMessageAC: (state, action: PayloadAction<{error: string | null}>) => {
            state.error = action.payload.error
        },
        setAppStatusAC: (state, action: PayloadAction<{status: RequestStatusType}>) => {
            state.status = action.payload.status
        },
        setAppIsInitializedAC: (state, action: PayloadAction<{isInitialized: boolean}>) => {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = sliceApp.reducer
export const {toggleAppModeAC, setAppIsInitializedAC, setAppErrorMessageAC, setAppStatusAC} = sliceApp.actions