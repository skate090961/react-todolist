import {TasksType} from "../../data/tasks";
import {tasksReducer} from "./tasks-reducer/tasksReducer";
import {addTodoListAC, removeTodoListAC} from "./todoLists-reducer/todoListsReducer";

test('task should be added when todo added', () => {
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
    const endState = tasksReducer(startState, addTodoListAC('title'))
    const keys = Object.keys(endState)
    const findKey = keys.find(key => key !== '1' && key !== '2')
    const someKey = keys.some(key => key === '1' || key === '2')

    expect(findKey && endState[findKey]).toEqual([])
    expect(keys.length).toEqual(3)
    expect(someKey).toBeTruthy()
})
test('task should be removed when todo removed', () => {
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
    const endState = tasksReducer(startState, removeTodoListAC('1'))

    const key = Object.keys(endState)

    expect(key.length).toBe(1)
    expect(key[0]).toBe('2')
})