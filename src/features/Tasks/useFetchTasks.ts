import { useEffect } from "react"
import { TaskDomainType, tasksThunks } from "features/Tasks/model/tasksSlice"
import { useSelector } from "react-redux"
import { AppRootStateType } from "app/rootReducer"
import { useAppDispatch } from "common/hooks/useAppDispatch"

export const useFetchTasks = (todoId: string) => {
  const tasks = useSelector<AppRootStateType, TaskDomainType[]>((state) => state.tasks[todoId])
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(tasksThunks.fetchTasks(todoId))
  }, [])
  return { tasks }
}
