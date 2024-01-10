import rootReducer, { AppRootStateType } from "./rootReducer"
import thunk from "redux-thunk"
import { configureStore } from "@reduxjs/toolkit"
import { ThunkMiddlewareFor } from "@reduxjs/toolkit/dist/getDefaultMiddleware"

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk as ThunkMiddlewareFor<AppRootStateType>),
})
