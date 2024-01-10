import { AppRootStateType } from "./rootReducer"

export const selectStatus = (state: AppRootStateType) => state.app.status
export const selectError = (state: AppRootStateType) => state.app.error
export const selectIsInitialized = (state: AppRootStateType) => state.app.isInitialized
export const selectIsDarkMode = (state: AppRootStateType) => state.app.isDarkMode
