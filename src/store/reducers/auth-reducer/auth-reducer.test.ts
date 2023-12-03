import {authReducer, setAuthUserAC, setIsAuthAC} from "./auth-reducer";

const startState = {
    authUser: null,
    isAuth: false
}

test('current user should be authorized', () => {
    const action = {
        id: 1,
        login: 'login',
        email: 'test@test.com'
    }
    const endState = authReducer(startState, setAuthUserAC(action))
    expect(endState.isAuth).toBeTruthy()
    expect(endState.authUser?.email).toBe(action.email)
    expect(endState.authUser?.login).toBe(action.login)
    expect(endState.authUser?.id).toBe(action.id)
})

test('auth status should be changed', () => {
    const endState = authReducer(startState, setIsAuthAC(true))
    expect(endState.isAuth).toBeTruthy()
})