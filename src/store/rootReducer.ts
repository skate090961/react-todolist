import {combineReducers} from "redux";
import {tasksReducer} from "./reducers/tasks-reducer/tasksReducer";
import {todoListsReducer} from "./reducers/todoLists-reducer/todoListsReducer";

export type RootReducerType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

export default rootReducer