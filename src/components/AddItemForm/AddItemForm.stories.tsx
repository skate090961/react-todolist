import type {Meta, StoryObj} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import AddItemForm from "./AddItemForm";

const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    tags: ['autodocs'],
    argTypes: {
        onChange: {
            description: 'Button clicked inside form',
            action: 'clicked'
        }
    },
}

export default meta;
type Story = StoryObj<typeof AddItemForm>

export const AddItemFormStory: Story = {
    args: {
        onChange: action('Button clicked inside form')
    },
}
