import {AnyAction, applyMiddleware, legacy_createStore as createStore} from "redux";
import rootReducer, {RootReducerType} from "./rootReducer";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";

export type AppDispatchType = ThunkDispatch<RootReducerType, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatchType>()

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)