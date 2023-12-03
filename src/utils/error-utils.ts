import {setAppErrorMessageAC, setAppStatusAC} from "../store/reducers/app-reducer/appReducer";
import {ResponseType} from "../API/todoLists-api";
import {Dispatch} from "redux";

export const handleServerAppError = (data: ResponseType, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorMessageAC(data.messages[0]))
    } else {
        dispatch(setAppErrorMessageAC('Some error'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (e: {message: string}, dispatch: Dispatch) => {
    dispatch(setAppErrorMessageAC(e.message ? e.message : 'Some error'))
    dispatch(setAppStatusAC('failed'))
}