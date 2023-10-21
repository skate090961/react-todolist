import {tasks, TasksType} from "../../../data/tasks";
import {v1} from "uuid";
import {addTodoListAC, removeTodoListAC} from "../todoLists-reducer/todoListsReducer";

const initialState = tasks

type ActionsTypes =
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof changeTaskTitleAC> |
    ReturnType<typeof changeTaskStatusAC> |
    ReturnType<typeof removeTaskAC> |
    ReturnType<typeof addTodoListAC> |
    ReturnType<typeof removeTodoListAC>

export const tasksReducer = (state: TasksType = initialState, action: ActionsTypes): TasksType => {
    switch (action.type) {
        case 'ADD-TASK':
            return {
                ...state,
                [action.todoId]: [
                    {id: v1(), title: action.title, isDone: false},
                    ...state[action.todoId]
                ]
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todoId]:
                    state[action.todoId].map(task =>
                        task.id === action.taskId
                            ? {...task, title: action.title}
                            : task
                    )
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todoId]:
                    state[action.todoId].map(task =>
                        task.id === action.taskId
                            ? {...task, isDone: action.isDone}
                            : task
                    )
            }
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todoId]: state[action.todoId].filter(task => task.id !== action.taskId)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.newTodoId]: []
            }
        case 'REMOVE-TODOLIST':
            const stateCopy = {...state}
            delete stateCopy[action.todoId]
            return stateCopy
        default:
            return state
    }
}

export const addTaskAC = (todoId: string, title: string) => ({
    type: 'ADD-TASK',
    todoId,
    title
} as const)
export const changeTaskTitleAC = (todoId: string, taskId: string, title: string) => ({
    type: 'CHANGE-TASK-TITLE',
    todoId,
    taskId,
    title
} as const)
export const changeTaskStatusAC = (todoId: string, taskId: string, isDone: boolean) => ({
    type: 'CHANGE-TASK-STATUS',
    todoId,
    taskId,
    isDone
} as const)
export const removeTaskAC = (todoId: string, taskId: string) => ({
    type: 'REMOVE-TASK',
    todoId,
    taskId,
} as const)