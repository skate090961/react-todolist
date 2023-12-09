import {authAPI, LoginParamsType, MeResponseType} from "../../../API/auth-api";
import {Dispatch} from "redux";
import {setAppStatusAC} from "../app-reducer/appReducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    authUser: null as MeResponseType | null,
    isAuth: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthUserAC: (state, action: PayloadAction<{authUser: null | MeResponseType}>) => {
            state.authUser = action.payload.authUser
            state.isAuth = true
        },
        setIsAuthAC: (state, action: PayloadAction<{isAuth: boolean}>) => {
            state.isAuth = action.payload.isAuth
        }
    }
})

export const authReducer = authSlice.reducer
export const {setAuthUserAC, setIsAuthAC} = authSlice.actions


