import {tasksReducer, TasksType} from "./tasks-reducer/tasksReducer";
import {addTodoListAC, removeTodoListAC} from "./todoLists-reducer/todoListsReducer";
import {tasks} from "../../mocks/tasks";

test('task should be added when todo added', () => {
    const todoList = {id: 'todoId_5', title: 'Learn', order: 0, addedDate: ''}
    const startState: TasksType = tasks
    const endState = tasksReducer(startState, addTodoListAC(todoList))
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
