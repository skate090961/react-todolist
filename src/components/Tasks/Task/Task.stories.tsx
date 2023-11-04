import type {Meta, StoryObj} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import Task from "./Task";
import {useState} from "react";

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
        task: {id: 'id_1', title: 'CSS', isDone: true},
    },
}
export const TaskIsNotDoneStory: Story = {
    args: {
        task: {id: 'id_1', title: 'CSS', isDone: false},
    },
}

const TaskToggle = () => {
    const [task, setTask] = useState({id: 'id_1', title: 'CSS', isDone: true})
    return <Task
        task={task}
        removeTask={action('remove task')}
        changeTaskTitle={(taskId, title) => setTask({...task, title: title})}
        changeTaskStatus={() => setTask({...task, isDone: !task.isDone})}
    />
}

export const TaskStory = () => {
    return <TaskToggle/>
}