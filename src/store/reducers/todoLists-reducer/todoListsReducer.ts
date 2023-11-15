import {todoListsAPI, TodoListType} from "../../../api/todoLists-api";
import {Dispatch} from "redux";

const initialState: TodoListDomainType[] = []

export const todoListsReducer = (state: TodoListDomainType[] = initialState, action: ActionsTypes): TodoListDomainType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            return [{...action.todoList, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todo => todo.id === action.todoId ? {...todo, title: action.title} : todo)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(todo => todo.id === action.todoId ? {...todo, filter: action.filter} : todo)
        case 'REMOVE-TODOLIST':
            return state.filter(todo => todo.id !== action.todoId)
        case 'SET-TODOLISTS':
            return action.todoLists.map(tl => ({...tl, filter: 'all'}))
        default:
            return state
    }
}

// actions
export const addTodoListAC = (todoList: TodoListType) =>
    ({type: 'ADD-TODOLIST', todoList} as const)
export const changeTodoListTitleAC = (todoId: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', todoId, title} as const)
export const changeTodoListFilterAC = (todoId: string, filter: FilterType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', todoId, filter} as const)
export const removeTodoListAC = (todoId: string) =>
    ({type: 'REMOVE-TODOLIST', todoId} as const)
export const setTodoListsAC = (todoLists: TodoListType[]) =>
    ({type: 'SET-TODOLISTS', todoLists} as const)

// thunk
export const fetchTodoListsTC = () => async (dispatch: Dispatch<ActionsTypes>) => {
    const todoLists = await todoListsAPI.getTodoLists()
    dispatch(setTodoListsAC(todoLists))
}

export const removeTodoListTC = (todoId: string) => async (dispatch: Dispatch<ActionsTypes>) => {
    await todoListsAPI.deleteTodoList(todoId)
    dispatch(removeTodoListAC(todoId))
}

export const addTodoListTC = (title: string) => async (dispatch: Dispatch<ActionsTypes>) => {
    const todoList = await todoListsAPI.createTodoList(title)
    dispatch(addTodoListAC(todoList.data.item))
}

export const changeTodoListTitleTC = (todoId: string, title: string) => async (dispatch: Dispatch<ActionsTypes>) => {
    await todoListsAPI.updateTodoList(todoId, title)
    dispatch(changeTodoListTitleAC(todoId, title))
}

// types
export type FilterType = 'all' | 'completed' | 'active'
export type TodoListDomainType = TodoListType & { filter: FilterType }
type ActionsTypes =
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof setTodoListsAC>