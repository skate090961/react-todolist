import { addTodoListAC, removeTodoListAC, setTodoListsAC } from "features/TodoLists/model/todoListsSlice"
import { Dispatch } from "redux"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RequestStatusType, setAppStatusAC } from "app/appSlice"
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk"
import { handleServerNetworkError } from "common/utils"
import { handleServerAppError } from "common/utils"
import { RESULT_CODE } from "features/TodoLists/api/todoListsApi.types"
import {
  AddTaskArgsType,
  TaskPriorities,
  TaskStatuses,
  TaskType,
  UpdateTaskModelType,
} from "features/Tasks/api/tasksApi.types"
import { tasksApi } from "features/Tasks/api/tasksApi"

const initialState: TasksType = {}

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    removeTaskAC: (state, action: PayloadAction<{ todoId: string; taskId: string }>) => {
      const tasks = state[action.payload.todoId]
      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      tasks.splice(index, 1)
    },
    changeTaskEntityStatusAC: (
      state,
      action: PayloadAction<{ todoId: string; taskId: string; status: RequestStatusType }>
    ) => {
      const tasks = state[action.payload.todoId]
      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      tasks[index] = { ...tasks[index], entityStatus: action.payload.status }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodoListAC, (state, action) => {
        state[action.payload.todoList.id] = []
      })
      .addCase(removeTodoListAC, (state, action) => {
        delete state[action.payload.todoId]
      })
      .addCase(setTodoListsAC, (state, action) => {
        action.payload.todoLists.forEach((t) => (state[t.id] = []))
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todoId] = action.payload.tasks.map((t) => ({ ...t, entityStatus: "idle" }))
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state[action.payload.task.todoListId].unshift({ ...action.payload.task, entityStatus: "idle" })
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todoId]
        const index = tasks.findIndex((t) => t.id === action.payload.taskId)
        tasks[index] = { ...tasks[index], ...action.payload.domainModel }
      })
  },
})

const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[]; todoId: string }, string>(
  `${slice.name}/fetchTasks`,
  async (todoId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    dispatch(setAppStatusAC({ status: "loading" }))
    try {
      const res = await tasksApi.getTasks(todoId)
      const tasks = res.items
      dispatch(setAppStatusAC({ status: "succeeded" }))
      return { tasks, todoId }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  }
)

const addTask = createAppAsyncThunk<{ task: TaskType }, AddTaskArgsType>(
  `${slice.name}/addTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    dispatch(setAppStatusAC({ status: "loading" }))
    try {
      const res = await tasksApi.createTask(arg)
      if (res.resultCode === RESULT_CODE.SUCCEEDED) {
        const task = res.data.item
        dispatch(setAppStatusAC({ status: "succeeded" }))
        return { task }
      } else {
        handleServerAppError(res, dispatch)
        return rejectWithValue(null)
      }
    } catch (e: any) {
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  }
)

export const removeTaskTC = (todoId: string, taskId: string) => async (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  try {
    dispatch(changeTaskEntityStatusAC({ todoId, taskId, status: "loading" }))
    const deleteTaskData = await tasksApi.deleteTask(todoId, taskId)
    if (deleteTaskData.resultCode === RESULT_CODE.SUCCEEDED) {
      dispatch(removeTaskAC({ todoId, taskId }))
      dispatch(setAppStatusAC({ status: "succeeded" }))
    } else {
      handleServerAppError(deleteTaskData, dispatch)
    }
  } catch (e: any) {
    handleServerNetworkError(e, dispatch)
  }
}

export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}

const updateTask = createAppAsyncThunk<
  {
    todoId: string
    taskId: string
    domainModel: UpdateDomainTaskModelType
  },
  {
    todoId: string
    taskId: string
    domainModel: UpdateDomainTaskModelType
  }
>(`${slice.name}/updateTask`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue, getState } = thunkAPI
  const task = getState().tasks[arg.todoId].find((task) => task.id === arg.taskId)
  if (!task) {
    console.warn("task not found in the state")
    return rejectWithValue(null)
  }
  const { title, startDate, description, deadline, priority, status } = task
  const apiModel: UpdateTaskModelType = {
    title,
    status,
    deadline,
    description,
    startDate,
    priority,
    ...arg.domainModel,
  }
  try {
    dispatch(changeTaskEntityStatusAC({ todoId: arg.todoId, taskId: arg.todoId, status: "loading" }))
    dispatch(setAppStatusAC({ status: "loading" }))
    const updateTaskData = await tasksApi.updateTask(arg.todoId, arg.taskId, apiModel)
    if (updateTaskData.resultCode === RESULT_CODE.SUCCEEDED) {
      dispatch(setAppStatusAC({ status: "succeeded" }))
      dispatch(changeTaskEntityStatusAC({ todoId: arg.todoId, taskId: arg.todoId, status: "succeeded" }))
      return arg
    } else {
      handleServerAppError(updateTaskData, dispatch)
      return rejectWithValue(null)
    }
  } catch (e: any) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  }
})

// types
export type TaskDomainType = TaskType & { entityStatus: RequestStatusType }

export type TasksType = {
  [key: string]: TaskDomainType[]
}

export const tasksSlice = slice.reducer
export const { removeTaskAC, changeTaskEntityStatusAC } = slice.actions
export const tasksThunks = { fetchTasks, addTask, updateTask }
