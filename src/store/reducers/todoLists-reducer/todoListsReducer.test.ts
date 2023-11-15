import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    setTodoListsAC,
    TodoListDomainType,
    todoListsReducer
} from "./todoListsReducer";
import {todoLists} from "../../../mocks/todoLists";

const startState: TodoListDomainType[] = todoLists
const newTitle = 'TODOLIST TITLE'
test('todolist should be added to array with todo lists', () => {
    const todoList = {id: 'todoId_1', title: 'Learn', order: 0, addedDate: ''}
    const startState = [
        todoLists[1]
    ]
    const endState = todoListsReducer(startState, addTodoListAC(todoList))

    expect(endState.length).toBe(2)
    expect(endState[0].id).toBe('todoId_1')
    expect(endState[0].filter).toBe('all')
    expect(endState[1].id).toBe('todoId_2')
})
test('title of todolist should be changed', () => {
    const endState = todoListsReducer(startState, changeTodoListTitleAC('todoId_1', newTitle))

    expect(endState[0].title).toBe(newTitle)
    expect(endState[1].title).toBe('Buy')
})
test('filter of todolist should be changed', () => {
    const newFilter = 'active'
    const endState = todoListsReducer(startState, changeTodoListFilterAC('todoId_1', newFilter))

    expect(endState[0].filter).toBe(newFilter)
    expect(endState[1].filter).toBe('all')
})
test('todolist should be removed from array with todo lists', () => {
    const endState = todoListsReducer(startState, removeTodoListAC('todoId_1'))

    expect(endState[0].id).toBe('todoId_2')
    expect(endState.length).toBe(1)
})
test('todolist should be set to the array', () => {
    const todoLists = [
        {id: 'todoId_1', title: 'Learn', order: 0, addedDate: ''},
        {id: 'todoId_2', title: 'Buy', order: 0, addedDate: ''}
    ]
    const endState = todoListsReducer([], setTodoListsAC(todoLists))

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('all')
})