import type {Meta, StoryObj} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import Task from "./Task";
import {TodoListContainerDecorator} from "../../../../.storybook/decorators/TodoListContainerDecorator";

const meta: Meta<typeof Task> = {
    title: 'TASKS/Task',
    component: Task,
    tags: ['autodocs'],
    decorators: [TodoListContainerDecorator],
    argTypes: {
        removeTask: {
            description: 'Remove Button clicked changed inside Task'
        },
        changeTaskTitle: {
            description: 'Title changed inside Task'
        },
        changeTaskStatus: {
            description: 'Status changed inside Task'
        },
        task: {id: 'id_1', title: 'JS', isDone: false}
    },
}

export default meta;

type Story = StoryObj<typeof Task>

export const TaskStory: Story = {
    args: {
        task: {id: 'id_1', title: 'CSS', isDone: true},
        removeTask: action('task removed'),
        changeTaskTitle: action('title of task changed'),
        changeTaskStatus: action('status of task changed')
    },
}