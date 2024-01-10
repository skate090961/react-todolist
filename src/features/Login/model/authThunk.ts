import { authApi, LoginParamsType } from "features/Login/api/authApi"
import { Dispatch } from "redux"
import { setIsAuthAC } from "features/Login/model/authSlice"
import { setAppStatusAC } from "app/appSlice"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"

export const loginTC = (login: LoginParamsType) => async (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  try {
    const loginResponse = await authApi.login(login)
    if (loginResponse.resultCode === 0) {
      dispatch(setIsAuthAC({ isAuth: true }))
      dispatch(setAppStatusAC({ status: "succeeded" }))
    } else {
      handleServerAppError(loginResponse, dispatch)
      return loginResponse.fieldsErrors
    }
  } catch (e: any) {
    handleServerNetworkError(e.message, dispatch)
  }
}

export const logOutTC = () => async (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  try {
    const logOutResponse = await authApi.logOut()
    if (logOutResponse.resultCode === 0) {
      dispatch(setIsAuthAC({ isAuth: false }))
      dispatch(setAppStatusAC({ status: "succeeded" }))
    } else {
      handleServerAppError(logOutResponse, dispatch)
    }
  } catch (e: any) {
    handleServerNetworkError(e.message, dispatch)
  }
}
