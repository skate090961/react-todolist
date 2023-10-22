import {FilterType, todoLists, TodoListsType} from "../../../data/todoLists";
import {v1} from "uuid";

const initialState = todoLists

type ActionsTypes =
    ReturnType<typeof addTodoListAC> |
    ReturnType<typeof changeTodoListTitleAC> |
    ReturnType<typeof changeTodoListFilterAC> |
    ReturnType<typeof removeTodoListAC>

export const todoListsReducer = (state: TodoListsType[] = initialState, action: ActionsTypes): TodoListsType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            return [
                {
                    id: action.newTodoId,
                    title: action.title,
                    filter: 'all'
                },
                ...state
            ]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todo =>
                todo.id === action.todoId
                    ? {...todo, title: action.title}
                    : todo
            )
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(todo => todo.id === action.todoId
                ? {...todo, filter: action.filter}
                : todo
            )
        case 'REMOVE-TODOLIST':
            return state.filter(todo =>
                todo.id !== action.todoId
            )
        default:
            return state
    }
}

export const addTodoListAC = (title: string) => ({
    type: 'ADD-TODOLIST',
    title,
    newTodoId: v1()
} as const)
export const changeTodoListTitleAC = (todoId: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    todoId,
    title
} as const)
export const changeTodoListFilterAC = (todoId: string, filter: FilterType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    todoId,
    filter
} as const)
export const removeTodoListAC = (todoId: string) => ({
    type: 'REMOVE-TODOLIST',
    todoId
} as const)