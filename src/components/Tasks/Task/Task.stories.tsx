import {action} from '@storybook/addon-actions'
import Task from "./Task";
import {Provider} from "react-redux";
import {store} from "../../../store/store";

export default {
    title: 'Task Component',
    component: Task,
}

const removeTask = action('Task is removed')
const changeTaskStatus = action('Status of task changed')
const changeTaskTitle = action('Title of task changed')

export const TaskBaseExample = () => {
    return (
        <Provider store={store}>
            <Task
                task={{id: '1', title: 'StoryBook', isDone: true}}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
            />
            <Task
                task={{id: '2', title: 'React', isDone: false}}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
            />
        </Provider>
    )
}