import { Dispatch } from "redux"
import { authApi } from "features/Login/api/authApi"
import { setIsAuthAC } from "features/Login/model/authSlice"
import { setAppIsInitializedAC } from "./appSlice"
import { handleServerAppError } from "common/utils"
import { handleServerNetworkError } from "common/utils"
export const initializeAppTC = () => async (dispatch: Dispatch) => {
  try {
    const response = await authApi.me()
    if (response.resultCode === 0) {
      dispatch(setIsAuthAC({ isAuth: true }))
    } else {
      handleServerAppError(response, dispatch)
    }
  } catch (e: any) {
    handleServerNetworkError(e, dispatch)
  } finally {
    dispatch(setAppIsInitializedAC({ isInitialized: true }))
  }
}
