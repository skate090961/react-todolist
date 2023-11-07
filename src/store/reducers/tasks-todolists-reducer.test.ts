import {tasksReducer, TasksType} from "./tasks-reducer/tasksReducer";
import {addTodoListAC, removeTodoListAC} from "./todoLists-reducer/todoListsReducer";
import {tasks} from "../../data/tasks";

test('task should be added when todo added', () => {
    const startState: TasksType = tasks
    const endState = tasksReducer(startState, addTodoListAC('title'))
    const keys = Object.keys(endState)
    const findKey = keys.find(key => key !== 'todoId_1' && key !== 'todoId_2')
    const someKey = keys.some(key => key === 'todoId_1' || key === 'todoId_2')

    expect(findKey && endState[findKey]).toEqual([])
    expect(keys.length).toEqual(3)
    expect(someKey).toBeTruthy()
})
test('task should be removed when todo removed', () => {
    const startState: TasksType = tasks
    const endState = tasksReducer(startState, removeTodoListAC('todoId_1'))

    const key = Object.keys(endState)

    expect(key.length).toBe(1)
    expect(key[0]).toBe('todoId_2')
})