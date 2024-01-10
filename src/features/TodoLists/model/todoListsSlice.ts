import { todoListsApi } from "features/TodoLists/api/todoListsApi"
import { Dispatch } from "redux"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RequestStatusType, setAppErrorMessageAC, setAppStatusAC } from "app/appSlice"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { RESULT_CODE, TodoListType } from "features/TodoLists/api/todoListsApi.types"

const initialState: TodoListDomainType[] = []

const slice = createSlice({
  name: "todoLists",
  initialState,
  reducers: {
    addTodoListAC: (state, action: PayloadAction<{ todoList: TodoListType }>) => {
      state.unshift({ ...action.payload.todoList, filter: "all", entityStatus: "idle" })
    },
    changeTodoListTitleAC: (state, action: PayloadAction<{ todoId: string; title: string }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.todoId)
      state[index].title = action.payload.title
    },
    changeTodoListFilterAC: (state, action: PayloadAction<{ todoId: string; filter: FilterType }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.todoId)
      state[index].filter = action.payload.filter
    },
    removeTodoListAC: (state, action: PayloadAction<{ todoId: string }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.todoId)
      state.splice(index, 1)
    },
    setTodoListsAC: (state, action: PayloadAction<{ todoLists: TodoListType[] }>) => {
      return action.payload.todoLists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
    },
    changeTodoListEntityStatusAC: (state, action: PayloadAction<{ todoId: string; status: RequestStatusType }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.todoId)
      state[index].entityStatus = action.payload.status
    },
  },
})

export const todoListsSlice = slice.reducer
export const {
  addTodoListAC,
  removeTodoListAC,
  changeTodoListEntityStatusAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  setTodoListsAC,
} = slice.actions

// thunk
export const fetchTodoListsTC = () => async (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  try {
    const todoLists = await todoListsApi.getTodoLists()
    dispatch(setTodoListsAC({ todoLists }))
    dispatch(setAppStatusAC({ status: "succeeded" }))
  } catch (e: any) {
    handleServerNetworkError(e, dispatch)
  }
}

export const removeTodoListTC = (todoId: string) => async (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  dispatch(changeTodoListEntityStatusAC({ todoId, status: "loading" }))
  try {
    const deleteTodoListData = await todoListsApi.deleteTodoList(todoId)
    if (deleteTodoListData.resultCode === RESULT_CODE.SUCCEEDED) {
      dispatch(removeTodoListAC({ todoId }))
      dispatch(setAppStatusAC({ status: "succeeded" }))
    } else {
      if (deleteTodoListData.messages.length) {
        dispatch(setAppErrorMessageAC({ error: deleteTodoListData.messages[0] }))
      } else {
        dispatch(setAppErrorMessageAC({ error: "some error" }))
      }
      dispatch(setAppStatusAC({ status: "failed" }))
    }
  } catch (e: any) {
    handleServerNetworkError(e, dispatch)
  }
}

export const addTodoListTC = (title: string) => async (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  try {
    const createTodoListData = await todoListsApi.createTodoList(title)
    dispatch(addTodoListAC({ todoList: createTodoListData.data.item }))
    dispatch(setAppStatusAC({ status: "succeeded" }))
  } catch (e: any) {
    handleServerNetworkError(e, dispatch)
    dispatch(setAppStatusAC({ status: "failed" }))
  }
}

export const changeTodoListTitleTC = (todoId: string, title: string) => async (dispatch: Dispatch) => {
  dispatch(changeTodoListEntityStatusAC({ todoId, status: "loading" }))
  dispatch(setAppStatusAC({ status: "loading" }))
  try {
    await todoListsApi.updateTodoList(todoId, title)
    dispatch(changeTodoListTitleAC({ todoId, title }))
    dispatch(changeTodoListEntityStatusAC({ todoId, status: "succeeded" }))
    dispatch(setAppStatusAC({ status: "succeeded" }))
  } catch (e: any) {
    handleServerNetworkError(e, dispatch)
  }
}

export type FilterType = "all" | "completed" | "active"
export type TodoListDomainType = TodoListType & { filter: FilterType; entityStatus: RequestStatusType }
