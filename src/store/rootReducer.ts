import {combineReducers} from "redux";
import {tasksReducer} from "./reducers/tasks-reducer/tasksReducer";

export type RootReducerType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    tasks: tasksReducer
})

console.log(rootReducer)

export default rootReducer