import type {Meta, StoryObj} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import EditableTitle from "./EditableTitle";

const meta: Meta<typeof EditableTitle> = {
    title: 'TODOLISTS/EditableTitle',
    component: EditableTitle,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered'
    },
    argTypes: {
    },
    args: {
        title: 'DOUBLE CLICK ME TO EDIT',
        onChangeTitle: action('Title changed')
    },
}

export default meta;
type Story = StoryObj<typeof EditableTitle>

export const EditableTitleStory: Story = {}

