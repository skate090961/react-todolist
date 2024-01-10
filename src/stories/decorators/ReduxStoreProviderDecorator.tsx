import { Provider } from "react-redux"
import { applyMiddleware, legacy_createStore } from "redux"
import React from "react"
import rootReducer, { AppRootStateType } from "../../app/rootReducer"
import { tasks } from "../../common/mocks/tasks"
import { todoLists } from "../../common/mocks/todoLists"
import { appMock } from "../../common/mocks/appMock"
import thunk from "redux-thunk"

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  const initialGlobalState = {
    tasks: tasks,
    todoLists: todoLists,
    app: appMock,
  }

  const storyState = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType, applyMiddleware(thunk))

  return <Provider store={storyState}>{storyFn()}</Provider>
}
