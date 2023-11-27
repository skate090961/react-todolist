import {addTodoListAC, removeTodoListAC, setTodoListsAC} from "../todoLists-reducer/todoListsReducer";
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../../../API/tasks-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../rootReducer";
import {RequestStatusType, setAppStatusAC} from "../app-reducer/appReducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";
import {RESULT_CODE} from "../../../API/todoLists-api";

const initialState = {}

export const tasksReducer = (state: TasksType = initialState, action: ActionsTypes): TasksType => {
    switch (action.type) {
        case 'ADD-TASK':
            return {
                ...state,
                [action.task.todoListId]: [{...action.task, entityStatus: 'idle'}, ...state[action.task.todoListId]]
            }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todoId]: state[action.todoId]
                    .map(task => task.id === action.taskId ? {...task, ...action.model} : task)
            }
        case 'REMOVE-TASK':
            return {...state, [action.todoId]: state[action.todoId].filter(task => task.id !== action.taskId)}
        case 'ADD-TODOLIST':
            return {...state, [action.todoList.id]: []}
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.todoId]
            return copyState
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.todoLists.forEach(tl => copyState[tl.id] = [])
            return copyState
        }
        case 'SET-TASKS': {
            return {...state, [action.todoId]: action.tasks.map(t => ({...t, entityStatus: 'idle'}))}
        }
        case 'CHANGE-TASK-ENTITY-STATUS':
            return {
                ...state, [action.todoId]: state[action.todoId]
                    .map(t => t.id === action.taskId ? {...t, entityStatus: action.status} : t)
            }
        default:
            return state
    }
}

// actions
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task,} as const)
export const updateTaskAC = (todoId: string, taskId: string, model: UpdateDomainTaskModelType) =>
    ({type: 'UPDATE-TASK', todoId, taskId, model} as const)
export const removeTaskAC = (todoId: string, taskId: string) =>
    ({type: 'REMOVE-TASK', todoId, taskId} as const)
export const setTasksAC = (tasks: TaskType[], todoId: string) =>
    ({type: 'SET-TASKS', todoId, tasks} as const)
export const changeTaskEntityStatusAC = (todoId: string, taskId: string, status: RequestStatusType) =>
    ({type: 'CHANGE-TASK-ENTITY-STATUS', todoId, taskId, status} as const)

// thunk
export const fetchTasksTC = (todoId: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const tasks = await tasksAPI.getTasks(todoId)
        dispatch(setTasksAC(tasks.items, todoId))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    }
}

export const removeTaskTC = (todoId: string, taskId: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        dispatch(changeTaskEntityStatusAC(todoId, taskId, 'loading'))
        const deleteTaskData = await tasksAPI.deleteTask(todoId, taskId)
        if (deleteTaskData.resultCode === RESULT_CODE.SUCCEEDED) {
            dispatch(removeTaskAC(todoId, taskId))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(deleteTaskData, dispatch)
        }
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    }
}

export const addTaskTC = (todoId: string, title: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const createTaskData = await tasksAPI.createTask(todoId, title)
        if (createTaskData.resultCode === RESULT_CODE.SUCCEEDED) {
            dispatch(addTaskAC(createTaskData.data.item))
            dispatch(setAppStatusAC('succeeded'))
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
            dispatch(changeTaskEntityStatusAC(todoId, taskId, 'loading'))
            dispatch(setAppStatusAC('loading'))
            const updateTaskData = await tasksAPI.updateTask(todoId, taskId, apiModel)
            if (updateTaskData.resultCode === RESULT_CODE.SUCCEEDED) {
                dispatch(updateTaskAC(todoId, taskId, domainModel))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(changeTaskEntityStatusAC(todoId, taskId, 'succeeded'))
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
type ActionsTypes =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof setTodoListsAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof changeTaskEntityStatusAC>