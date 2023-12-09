import {addTodoListAC, removeTodoListAC, setTodoListsAC} from "../todoLists-reducer/todoListsReducer";
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../../../API/tasks-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../rootReducer";
import {RequestStatusType, setAppStatusAC} from "../app-reducer/appReducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";
import {RESULT_CODE} from "../../../API/todoLists-api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksType = {}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTaskAC: (state, action: PayloadAction<{ task: TaskType }>) => {
            state[action.payload.task.todoListId].unshift({...action.payload.task, entityStatus: 'idle'})
        },
        updateTaskAC: (state, action: PayloadAction<{ todoId: string, taskId: string, model: UpdateDomainTaskModelType }>) => {
            const tasks = state[action.payload.todoId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            tasks[index] = {...tasks[index], ...action.payload.model}
        },
        removeTaskAC: (state, action: PayloadAction<{ todoId: string, taskId: string }>) => {
            const tasks = state[action.payload.todoId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            tasks.splice(index, 1)
        },
        setTasksAC: (state, action: PayloadAction<{ tasks: TaskType[], todoId: string }>) => {
            state[action.payload.todoId] = action.payload.tasks.map(t => ({...t, entityStatus: 'idle'}))
        },
        changeTaskEntityStatusAC: (state, action: PayloadAction<{ todoId: string, taskId: string, status: RequestStatusType }>) => {
            const tasks = state[action.payload.todoId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            tasks[index] = {...tasks[index], entityStatus: action.payload.status}
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
                action.payload.todoLists.forEach(t => state[t.id] = [])
            })
    }
})

export const tasksReducer = tasksSlice.reducer
export const {setTasksAC, removeTaskAC, changeTaskEntityStatusAC, updateTaskAC, addTaskAC} = tasksSlice.actions

// thunk
export const fetchTasksTC = (todoId: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const tasks = await tasksAPI.getTasks(todoId)
        dispatch(setTasksAC({tasks: tasks.items, todoId}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    }
}

export const removeTaskTC = (todoId: string, taskId: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        dispatch(changeTaskEntityStatusAC({todoId, taskId, status: 'loading'}))
        const deleteTaskData = await tasksAPI.deleteTask(todoId, taskId)
        if (deleteTaskData.resultCode === RESULT_CODE.SUCCEEDED) {
            dispatch(removeTaskAC({todoId, taskId}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(deleteTaskData, dispatch)
        }
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    }
}

export const addTaskTC = (todoId: string, title: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const createTaskData = await tasksAPI.createTask(todoId, title)
        if (createTaskData.resultCode === RESULT_CODE.SUCCEEDED) {
            dispatch(addTaskAC({task: createTaskData.data.item}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(createTaskData, dispatch)
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

export const updateTaskTC = (todoId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
    async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todoId].find(task => task.id === taskId)
        if (!task) {
            console.warn('task not found in the state')
            return
        }
        const {title, startDate, description, deadline, priority, status} = task
        const apiModel: UpdateTaskModelType = {
            title,
            status,
            deadline,
            description,
            startDate,
            priority,
            ...domainModel
        }
        try {
            dispatch(changeTaskEntityStatusAC({todoId, taskId, status: 'loading'}))
            dispatch(setAppStatusAC({status: 'loading'}))
            const updateTaskData = await tasksAPI.updateTask(todoId, taskId, apiModel)
            if (updateTaskData.resultCode === RESULT_CODE.SUCCEEDED) {
                dispatch(updateTaskAC({todoId, taskId, model: domainModel}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
                dispatch(changeTaskEntityStatusAC({todoId, taskId, status: 'succeeded'}))
            } else {
                handleServerAppError(updateTaskData, dispatch)
            }
        } catch (e: any) {
            handleServerNetworkError(e, dispatch)
        }
    }

// types
export type TaskDomainType = TaskType & { entityStatus: RequestStatusType }

export type TasksType = {
    [key: string]: TaskDomainType[]
}
