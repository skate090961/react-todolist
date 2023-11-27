import {combineReducers} from "redux";
import {tasksReducer} from "./reducers/tasks-reducer/tasksReducer";
import {todoListsReducer} from "./reducers/todoLists-reducer/todoListsReducer";
import {appReducer} from "./reducers/app-reducer/appReducer";

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer
})

export default rootReducer