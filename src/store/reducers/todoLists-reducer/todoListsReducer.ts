import {RESULT_CODE, todoListsAPI, TodoListType} from "../../../API/todoLists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppErrorMessageAC, setAppStatusAC} from "../app-reducer/appReducer";
import {handleServerNetworkError} from "../../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TodoListDomainType[] = []

const todoListsSlice = createSlice({
    name: 'todoLists',
    initialState,
    reducers: {
        addTodoListAC: (state, action: PayloadAction<{ todoList: TodoListType }>) => {
            state.unshift({...action.payload.todoList, filter: 'all', entityStatus: 'idle'})
        },
        changeTodoListTitleAC: (state, action: PayloadAction<{ todoId: string, title: string }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.todoId)
            state[index].title = action.payload.title
        },
        changeTodoListFilterAC: (state, action: PayloadAction<{ todoId: string, filter: FilterType }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.todoId)
            state[index].filter = action.payload.filter
        },
        removeTodoListAC: (state, action: PayloadAction<{ todoId: string }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.todoId)
            state.splice(index, 1)
        },
        setTodoListsAC: (state, action: PayloadAction<{ todoLists: TodoListType[] }>) => {
            return action.payload.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        },
        changeTodoListEntityStatusAC: (state, action: PayloadAction<{ todoId: string, status: RequestStatusType }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.todoId)
            state[index].entityStatus = action.payload.status
        }
    }
})

export const todoListsReducer = todoListsSlice.reducer
export const {
    addTodoListAC,
    removeTodoListAC,
    changeTodoListEntityStatusAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    setTodoListsAC
} = todoListsSlice.actions

// thunk
export const fetchTodoListsTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const todoLists = await todoListsAPI.getTodoLists()
        dispatch(setTodoListsAC({todoLists}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    }
}

export const removeTodoListTC = (todoId: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodoListEntityStatusAC({todoId, status: 'loading'}))
    try {
        const deleteTodoListData = await todoListsAPI.deleteTodoList(todoId)
        if (deleteTodoListData.resultCode === RESULT_CODE.SUCCEEDED) {
            dispatch(removeTodoListAC({todoId}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            if (deleteTodoListData.messages.length) {
                dispatch(setAppErrorMessageAC({error: deleteTodoListData.messages[0]}))
            } else {
                dispatch(setAppErrorMessageAC({error: 'some error'}))
            }
            dispatch(setAppStatusAC({status: 'failed'}))
        }
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    }
}

export const addTodoListTC = (title: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const createTodoListData = await todoListsAPI.createTodoList(title)
        dispatch(addTodoListAC({todoList: createTodoListData.data.item}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
        dispatch(setAppStatusAC({status: 'failed'}))
    }
}

export const changeTodoListTitleTC = (todoId: string, title: string) => async (dispatch: Dispatch) => {
    dispatch(changeTodoListEntityStatusAC({todoId, status: 'loading'}))
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        await todoListsAPI.updateTodoList(todoId, title)
        dispatch(changeTodoListTitleAC({todoId, title}))
        dispatch(changeTodoListEntityStatusAC({todoId, status: 'succeeded'}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
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