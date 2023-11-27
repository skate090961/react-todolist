import {RESULT_CODE, todoListsAPI, TodoListType} from "../../../API/todoLists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppErrorMessageAC, setAppStatusAC} from "../app-reducer/appReducer";
import {handleServerNetworkError} from "../../../utils/error-utils";
import {AxiosError} from "axios";

const initialState: TodoListDomainType[] = []

export const todoListsReducer = (state: TodoListDomainType[] = initialState, action: ActionsTypes): TodoListDomainType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            return [{...action.todoList, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todo => todo.id === action.todoId ? {...todo, title: action.title} : todo)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(todo => todo.id === action.todoId ? {...todo, filter: action.filter} : todo)
        case 'REMOVE-TODOLIST':
            return state.filter(todo => todo.id !== action.todoId)
        case 'SET-TODOLISTS':
            return action.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(todo => todo.id === action.todoId ? {...todo, entityStatus: action.status} : todo)
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
export const changeTodoListEntityStatusAC = (todoId: string, status: RequestStatusType) =>
    ({type: 'CHANGE-TODOLIST-ENTITY-STATUS', todoId, status} as const)

// thunk
export const fetchTodoListsTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const todoLists = await todoListsAPI.getTodoLists()
        dispatch(setTodoListsAC(todoLists))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    }
}

export const removeTodoListTC = (todoId: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodoListEntityStatusAC(todoId, 'loading'))
    try {
        const deleteTodoListData = await todoListsAPI.deleteTodoList(todoId)
        if (deleteTodoListData.resultCode === RESULT_CODE.SUCCEEDED) {
            dispatch(removeTodoListAC(todoId))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            if (deleteTodoListData.messages.length) {
                dispatch(setAppErrorMessageAC(deleteTodoListData.messages[0]))
            } else {
                dispatch(setAppErrorMessageAC('some error'))
            }
            dispatch(setAppStatusAC('failed'))
        }
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    }
}

export const addTodoListTC = (title: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const createTodoListData = await todoListsAPI.createTodoList(title)
        dispatch(addTodoListAC(createTodoListData.data.item))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    }
}

export const changeTodoListTitleTC = (todoId: string, title: string) => async (dispatch: Dispatch) => {
    dispatch(changeTodoListEntityStatusAC(todoId, 'loading'))
    dispatch(setAppStatusAC('loading'))
    try {
        await todoListsAPI.updateTodoList(todoId, title)
        dispatch(changeTodoListTitleAC(todoId, title))
        dispatch(changeTodoListEntityStatusAC(todoId, 'succeeded'))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    }
}

// types
export type FilterType = 'all' | 'completed' | 'active'
export type TodoListDomainType = TodoListType & { filter: FilterType, entityStatus: RequestStatusType }
type ActionsTypes =
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof setTodoListsAC>
    | ReturnType<typeof changeTodoListEntityStatusAC>