import {useEffect} from "react";
import {fetchTodoListsTC, TodoListDomainType} from "../../../store/reducers/todoLists-reducer/todoListsReducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/rootReducer";
import {useAppDispatch} from "../../../hooks/useAppDispatch/useAppDispatch";

export const useFetchTodoLists = () => {
    const todoLists = useSelector<AppRootStateType, TodoListDomainType[]>(state => state.todoLists)
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (isAuth)
            dispatch(fetchTodoListsTC())
        else {
            return
        }
    }, [dispatch])
    return {todoLists}
}