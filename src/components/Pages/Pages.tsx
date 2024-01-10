import React from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import TodoLists from "features/TodoLists/ui/TodoLists"
import { Login } from "features/Login/ui/Login"

export const Pages = () => {
  enum ROUTES {
    HOME = "/",
    LOGIN = "/login",
    NOT_FOUND = "/404",
  }

  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<TodoLists />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.NOT_FOUND} element={<div>404 PAGE NOT FOUND</div>} />
      <Route path={"*"} element={<Navigate to={ROUTES.NOT_FOUND} />} />
    </Routes>
  )
}
