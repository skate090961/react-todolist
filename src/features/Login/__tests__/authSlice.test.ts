import { authSlice, setAuthUserAC, setIsAuthAC } from "features/Login/model/authSlice"

const startState = {
  authUser: null,
  isAuth: false,
}

test("current user should be authorized", () => {
  const action = {
    id: 1,
    login: "login",
    email: "test@test.com",
  }
  const endState = authSlice(startState, setAuthUserAC({ authUser: action }))
  expect(endState.isAuth).toBeTruthy()
  expect(endState.authUser?.email).toBe(action.email)
  expect(endState.authUser?.login).toBe(action.login)
  expect(endState.authUser?.id).toBe(action.id)
})

test("auth status should be changed", () => {
  const endState = authSlice(startState, setIsAuthAC({ isAuth: true }))
  expect(endState.isAuth).toBeTruthy()
})
