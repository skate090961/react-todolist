import { MeResponseType } from "features/Login/api/authApi"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
  authUser: null as MeResponseType | null,
  isAuth: false,
}

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUserAC: (state, action: PayloadAction<{ authUser: null | MeResponseType }>) => {
      state.authUser = action.payload.authUser
      state.isAuth = true
    },
    setIsAuthAC: (state, action: PayloadAction<{ isAuth: boolean }>) => {
      state.isAuth = action.payload.isAuth
    },
  },
})

export const authSlice = slice.reducer
export const { setAuthUserAC, setIsAuthAC } = slice.actions
