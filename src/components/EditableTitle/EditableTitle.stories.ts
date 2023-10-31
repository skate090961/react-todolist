import type {Meta, StoryObj} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import EditableTitle from "./EditableTitle";

const meta: Meta<typeof EditableTitle> = {
    title: 'TODOLISTS/EditableTitle',
    component: EditableTitle,
    tags: ['autodocs'],
    argTypes: {
        onChangeTitle: {
            description: 'Title changed',
        },
        title: {
            description: 'Start title empty. Add title push button set string.'
        }
    },
}

export default meta;
type Story = StoryObj<typeof EditableTitle>

export const EditableTitleStory: Story = {
    args: {
        onChangeTitle: action('Title changed')
    },
}
