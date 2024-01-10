import type { Meta, StoryObj } from "@storybook/react"
import TaskFilter from "features/Tasks/TasksFilter/TaskFilter"
import { action } from "@storybook/addon-actions"

const meta: Meta<typeof TaskFilter> = {
  title: "TASKS/Task Filter",
  component: TaskFilter,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    filter: TaskFilter,
    changeFilter: {
      description: "Button clicked changed filter",
    },
  },
}

export default meta

type Story = StoryObj<typeof TaskFilter>

export const TaskFilterStory: Story = {
  args: {
    filter: "all",
    changeFilter: action("filter changed"),
  },
}
