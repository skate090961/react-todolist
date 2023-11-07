import {v1} from "uuid";
import {TodoListType} from "../../../api/todoLists-api";

const initialState:TodoListDomainType[] = []

export type FilterType = 'all' | 'completed' | 'active'

export type TodoListDomainType = TodoListType & {
    filter: FilterType
}

type ActionsTypes =
    ReturnType<typeof addTodoListAC> |
    ReturnType<typeof changeTodoListTitleAC> |
    ReturnType<typeof changeTodoListFilterAC> |
    ReturnType<typeof removeTodoListAC>

export const todoListsReducer = (state: TodoListDomainType[] = initialState, action: ActionsTypes): TodoListDomainType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            return [
                {
                    id: action.newTodoId,
                    title: action.title,
                    filter: 'all',
                    addedDate: '',
                    order: 0
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