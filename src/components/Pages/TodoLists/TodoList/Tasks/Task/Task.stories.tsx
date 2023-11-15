import type {Meta, StoryObj} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import Task from "./Task";
import {useState} from "react";
import {TaskStatuses} from "../../../../../../api/tasks-api";
import {tasks} from "../../../../../../mocks/tasks";

const meta: Meta<typeof Task> = {
    title: 'TASKS/Task',
    component: Task,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered'
    },
    args: {
        removeTask: action('task removed'),
        changeTaskTitle: action('title of task changed'),
        changeTaskStatus: action('status of task changed')
    }
}

export default meta;

type Story = StoryObj<typeof Task>

export const TaskIsDoneStory: Story = {
    args: {
        task: tasks['todoId_1'][0],
    },
}
export const TaskIsNotDoneStory: Story = {
    args: {
        task: tasks['todoId_1'][1],
    },
}

const TaskToggle = () => {
    const [task, setTask] = useState(tasks['todoId_1'][0])
    return <Task
        task={task}
        removeTask={action('remove task')}
        changeTaskTitle={(taskId, title) => setTask({...task, title: title})}
        changeTaskStatus={() => setTask({...task, status: TaskStatuses.Completed})}
    />
}

export const TaskStory = () => {
    return <TaskToggle/>
}