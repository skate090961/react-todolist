import React, { useCallback } from "react"
import { useSelector } from "react-redux"
import TodoList from "features/TodoLists/TodoList/TodoList"
import AddElement from "common/components/AddItemForm/AddItemForm"
import Grid from "@mui/material/Grid"
import s from "features/TodoLists/ui/Todolists.module.scss"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useFetchTodoLists } from "features/TodoLists/model/useFetchTodoLists"
import { Navigate } from "react-router-dom"
import { selectStatus } from "app/appSelectors"
import { selectIsAuth } from "features/Login/model/authSelectors"
import { addTodoListTC } from "features/TodoLists/model/todoListsSlice"

const TodoLists = () => {
  const { todoLists } = useFetchTodoLists()
  const isAuth = useSelector(selectIsAuth)
  const status = useSelector(selectStatus)
  const isDisabled = status === "loading"
  const todoListElements = todoLists.map((todo) => <TodoList key={todo.id} todoList={todo} />)
  const dispatch = useAppDispatch()
  const addTodoList = useCallback((title: string) => {
    dispatch(addTodoListTC(title))
  }, [])

  return (
    <>
      {isAuth ? (
        <div className={s.todoLists}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <AddElement onChange={addTodoList} placeholder={"...add todo"} disabled={isDisabled} />
            </Grid>
            {todoListElements}
          </Grid>
        </div>
      ) : (
        <Navigate to={"/login"} />
      )}
    </>
  )
}

export default React.memo(TodoLists)
