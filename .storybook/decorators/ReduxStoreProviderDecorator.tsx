import {Provider} from "react-redux";
import {legacy_createStore} from "redux";
import rootReducer, {RootReducerType} from "../../src/store/rootReducer";
import {v1} from "uuid";
import React from "react";

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    const initialGlobalState = {
        tasks: {
            ['taskId_1']: [
                {id: v1(), title: 'HTML', isDone: true},
                {id: v1(), title: 'CSS', isDone: true},
                {id: v1(), title: 'JavaScript', isDone: true},
            ],
            ['taskId_2']: [
                {id: v1(), title: 'Bread', isDone: false},
                {id: v1(), title: 'Salt', isDone: true},
            ]
        },
        todoLists: [
            {id: 'taskId_1', title: "What to learn", filter: "all"},
            {id: 'taskId_2', title: "What to buy", filter: "all"}
        ],
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