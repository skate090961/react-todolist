import {addTodoListAC, removeTodoListAC, setTodoListsAC} from "../todoLists-reducer/todoListsReducer";
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../../../api/tasks-api";
import {Dispatch} from "redux";
import {RootReducerType} from "../../rootReducer";

const initialState = {}

export const tasksReducer = (state: TasksType = initialState, action: ActionsTypes): TasksType => {
    switch (action.type) {
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]],}
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
            return {...state, [action.todoId]: action.tasks}
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

// thunk
export const fetchTasksTC = (todoId: string) => async (dispatch: Dispatch<ActionsTypes>) => {
    const tasks = await tasksAPI.getTasks(todoId)
    dispatch(setTasksAC(tasks, todoId))
}

export const removeTaskTC = (todoId: string, taskId: string) => async (dispatch: Dispatch<ActionsTypes>) => {
    await tasksAPI.deleteTask(todoId, taskId)
    dispatch(removeTaskAC(todoId, taskId))
}

export const addTaskTC = (todoId: string, title: string) => async (dispatch: Dispatch<ActionsTypes>) => {
    const task = await tasksAPI.createTask(todoId, title)
    dispatch(addTaskAC(task))
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
    async (dispatch: Dispatch<ActionsTypes>, getState: () => RootReducerType) => {
        const state = getState()
        const task = state.tasks[todoId].find(task => task.id === taskId)
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
        await tasksAPI.updateTask(todoId, taskId, apiModel)
        dispatch(updateTaskAC(todoId, taskId, domainModel))
    }

// types
export type TasksType = {
    [key: string]: TaskType[]
}
type ActionsTypes =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof setTodoListsAC>
    | ReturnType<typeof setTasksAC>


