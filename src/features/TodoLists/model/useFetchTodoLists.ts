import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { selectIsAuth } from "features/Login/model/authSelectors"
import { selectTodoLists } from "features/TodoLists/model/todoListSelectors"
import { fetchTodoListsTC } from "features/TodoLists/model/todoListsSlice"

export const useFetchTodoLists = () => {
  const todoLists = useSelector(selectTodoLists)
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (isAuth) dispatch(fetchTodoListsTC())
    else {
      return
    }
  }, [dispatch])
  return { todoLists }
}
