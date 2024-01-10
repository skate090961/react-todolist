import { Dispatch } from "redux"
import axios from "axios"
import { setAppErrorMessageAC, setAppStatusAC } from "../../app/appSlice"

export const handleServerNetworkError = (e: unknown, dispatch: Dispatch): void => {
  let errorMessage = "Some error message"
  if (axios.isAxiosError(e)) {
    errorMessage = e.response?.data?.message || e?.message || errorMessage
  } else if (e instanceof Error) {
    errorMessage = `Native error: ${e.message}`
  } else {
    errorMessage = JSON.stringify(e)
  }

  dispatch(setAppErrorMessageAC({ error: errorMessage }))
  dispatch(setAppStatusAC({ status: "failed" }))
}
