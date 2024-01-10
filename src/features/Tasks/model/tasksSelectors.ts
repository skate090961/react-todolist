import { AppRootStateType } from "app/rootReducer"

export const selectTasks = (state: AppRootStateType) => state.tasks
