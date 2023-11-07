import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer, TasksType} from "./tasksReducer";
import {TaskStatuses} from "../../../api/tasks-api";
import {tasks} from "../../../data/tasks";

const startState: TasksType = tasks
const newTitle = 'NEW TASK!'

test('task should be added to array with tasks', () => {
    const endState = tasksReducer(startState, addTaskAC('todoId_1', newTitle))

    expect(endState['todoId_1'].length).toBe(4)
    expect(endState['todoId_2'].length).toBe(2)
    expect(endState['todoId_1'][0].id).toBeDefined()
    expect(endState['todoId_1'][0].status === TaskStatuses.New).toBeDefined()
    expect(endState['todoId_1'][0].title).toBe(newTitle)
})
test('title of task should be changed', () => {
    const endState = tasksReducer(startState, changeTaskTitleAC('todoId_1', 'taskId_2', newTitle))

    expect(endState['todoId_1'][0].title).toBe('HTML')
    expect(endState['todoId_1'][2].title).toBe('JavaScript')
    expect(endState['todoId_1'][1].title).toBe(newTitle)
    expect(endState['todoId_2'][1].title).toBe('Salt')
})
test('status of task should be changed', () => {
    const endState = tasksReducer(startState, changeTaskStatusAC('todoId_1', 'taskId_2', TaskStatuses.Completed))

    expect(endState['todoId_1'][0].status === TaskStatuses.Completed).toBeTruthy()
    expect(endState['todoId_1'][1].status === TaskStatuses.Completed).toBeTruthy()
    expect(endState['todoId_1'][2].status === TaskStatuses.Completed).toBeFalsy()
    expect(endState['todoId_2'][1].status === TaskStatuses.Completed).toBeTruthy()
})
test('task should be removed from array with tasks', () => {
    const endState = tasksReducer(startState, removeTaskAC('todoId_1', 'taskId_2'))

    expect(endState['todoId_1'][1].id).toBe('taskId_3')
    expect(endState['todoId_1'].length).toBe(2)
    expect(endState['todoId_2'][1].id).toBe('taskId_2')
    expect(endState['todoId_2'].length).toBe(2)
})