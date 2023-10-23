import {combineReducers} from "redux";
import {tasksReducer} from "./reducers/tasks-reducer/tasksReducer";
import {todoListsReducer} from "./reducers/todoLists-reducer/todoListsReducer";
import {modeReducer} from "./reducers/mode-reducer/modeReducer";

export type RootReducerType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    mode: modeReducer
})

export default rootReducer