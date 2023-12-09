import {Dispatch} from "redux";
import {authAPI} from "../../../API/auth-api";
import {setIsAuthAC} from "../auth-reducer/auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";
import {setAppIsInitializedAC} from "./appReducer";

export const initializeAppTC = () => async (dispatch: Dispatch) => {
    try {
        const response = await authAPI.me()
        if (response.resultCode === 0) {
            dispatch(setIsAuthAC({isAuth: true}))
        } else {
            handleServerAppError(response, dispatch)
        }
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(setAppIsInitializedAC({isInitialized: true}))
    }
}