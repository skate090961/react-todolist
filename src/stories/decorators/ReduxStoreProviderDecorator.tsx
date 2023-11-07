import {Provider} from "react-redux";
import {legacy_createStore} from "redux";
import React from "react";
import rootReducer, {RootReducerType} from "../../store/rootReducer";
import {tasks} from "../../data/tasks";
import {todoLists} from "../../data/todoLists";

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    const initialGlobalState = {
        tasks: tasks,
        todoLists: todoLists,
        mode: {
            isDarkMode: false
        }
    }

    const storyState = legacy_createStore(rootReducer, initialGlobalState as RootReducerType)

    return (
        <Provider store={storyState}>
            {storyFn()}
        </Provider>
    )
}