import { combineReducers } from "redux"
import { tasksSlice } from "features/Tasks/model/tasksSlice"
import { todoListsSlice } from "features/TodoLists/model/todoListsSlice"
import { authSlice } from "features/Login/model/authSlice"
import { appSlice } from "./appSlice"

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  tasks: tasksSlice,
  todoLists: todoListsSlice,
  app: appSlice,
  auth: authSlice,
})

export default rootReducer
