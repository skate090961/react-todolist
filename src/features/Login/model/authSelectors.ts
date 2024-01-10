import { AppRootStateType } from "app/rootReducer"

export const selectIsAuth = (state: AppRootStateType) => state.auth.isAuth
export const selectAuthUser = (state: AppRootStateType) => state.auth.authUser
