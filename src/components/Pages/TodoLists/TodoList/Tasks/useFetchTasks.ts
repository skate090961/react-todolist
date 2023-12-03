import {useEffect} from "react";
import {fetchTasksTC, TaskDomainType} from "../../../../../store/reducers/tasks-reducer/tasksReducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../../store/rootReducer";
import {useAppDispatch} from "../../../../../hooks/useAppDispatch/useAppDispatch";

export const useFetchTasks = (todoId: string) => {
    const tasks = useSelector<AppRootStateType, TaskDomainType[]>(state => state.tasks[todoId])
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchTasksTC(todoId))
    }, [])
    return {tasks}
}
