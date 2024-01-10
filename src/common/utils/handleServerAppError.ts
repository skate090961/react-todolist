import { Dispatch } from "redux"
import { setAppErrorMessageAC, setAppStatusAC } from "app/appSlice"
import { ResponseTodoListType } from "features/TodoLists/api/todoListsApi.types"

export const handleServerAppError = (data: ResponseTodoListType, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(setAppErrorMessageAC({ error: data.messages[0] }))
  } else {
    dispatch(setAppErrorMessageAC({ error: "Some error" }))
  }
  dispatch(setAppStatusAC({ status: "failed" }))
}
