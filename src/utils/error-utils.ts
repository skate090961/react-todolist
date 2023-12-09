import {setAppErrorMessageAC, setAppStatusAC} from "../store/reducers/app-reducer/appReducer";
import {ResponseType} from "../API/todoLists-api";
import {Dispatch} from "redux";

export const handleServerAppError = (data: ResponseType, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorMessageAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorMessageAC({error: 'Some error'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerNetworkError = (e: {message: string}, dispatch: Dispatch) => {
    dispatch(setAppErrorMessageAC({error: e.message ? e.message : 'Some error'}))
    dispatch(setAppStatusAC({status: 'failed'}))
}