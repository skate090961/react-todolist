import {TasksType} from "../../../data/tasks";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasksReducer";

const startState: TasksType = {
    ['1']: [
        {id: '1', title: 'HTML', isDone: true},
        {id: '2', title: 'CSS', isDone: true},
        {id: '3', title: 'JavaScript', isDone: false},
    ],
    ['2']: [
        {id: '1', title: 'Bread', isDone: false},
        {id: '2', title: 'Salt', isDone: true},
    ]
}
const newTitle = 'NEW TASK!'

test('task should be added to array with tasks', () => {
    const endState = tasksReducer(startState, addTaskAC('1', newTitle))

    expect(endState['1'].length).toBe(4)
    expect(endState['2'].length).toBe(2)
    expect(endState['1'][0].id).toBeDefined()
    expect(endState['1'][0].isDone).toBeDefined()
    expect(endState['1'][0].title).toBe(newTitle)
})
test('title of task should be changed', () => {
    const endState = tasksReducer(startState, changeTaskTitleAC('1', '2', newTitle))

    expect(endState['1'][0].title).toBe('HTML')
    expect(endState['1'][2].title).toBe('JavaScript')
    expect(endState['1'][1].title).toBe(newTitle)
    expect(endState['2'][1].title).toBe('Salt')
})
test('status of task should be changed', () => {
    const endState = tasksReducer(startState, changeTaskStatusAC('1', '2', false))

    expect(endState['1'][0].isDone).toBeTruthy()
    expect(endState['1'][1].isDone).toBeFalsy()
    expect(endState['1'][2].isDone).toBeFalsy()
    expect(endState['2'][1].isDone).toBeTruthy()
})
test('task should be removed from array with tasks', () => {
    const endState = tasksReducer(startState, removeTaskAC('1', '2'))

    expect(endState['1'][1].id).toBe('3')
    expect(endState['1'].length).toBe(2)
    expect(endState['2'][1].id).toBe('2')
    expect(endState['2'].length).toBe(2)
})