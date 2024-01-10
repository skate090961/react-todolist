import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppRootStateType } from "app/rootReducer"
import { AppDispatchType } from "../hooks/useAppDispatch"

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootStateType
  dispatch: AppDispatchType
  rejectValue: null
}>()
