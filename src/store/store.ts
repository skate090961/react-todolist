import {applyMiddleware, legacy_createStore as createStore} from "redux";
import rootReducer from "./rootReducer";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from "redux-thunk";

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

//@ts-ignore
window.store = store