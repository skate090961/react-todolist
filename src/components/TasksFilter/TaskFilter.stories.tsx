import type {Meta, StoryObj} from '@storybook/react'
import TaskFilter from "./TaskFilter";
import {action} from "@storybook/addon-actions";
import {TodoListContainerDecorator} from "../../../.storybook/decorators/TodoListContainerDecorator";

const meta: Meta<typeof TaskFilter> = {
    title: 'TASKS/Task Filter',
    component: TaskFilter,
    tags: ['autodocs'],
    decorators: [TodoListContainerDecorator],
    argTypes: {
        filter: TaskFilter,
        changeFilter: {
            description: 'Button clicked changed filter'
        }
    }
}

export default meta;

type Story = StoryObj<typeof TaskFilter>

export const TaskFilterStory: Story = {
    args: {
        filter: 'all',
        changeFilter: action('filter changed')
    },
}