import {TodoListsType} from "../../../data/todoLists";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from "./todoListsReducer";

const startState: TodoListsType[] = [
    {id: '1', title: 'Learn', filter: 'all'},
    {id: '2', title: 'Buy', filter: 'all'}
]
const newTitle = 'TODOLIST TITLE'
test('todolist should be added to array with todo lists', () => {
    const endState = todoListsReducer(startState, addTodoListAC(newTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].id).toBeDefined()
    expect(endState[0].title).toBe(newTitle)
    expect(endState[0].filter).toBe('all')
    expect(endState[1].id).toBe('1')
    expect(endState[2].id).toBe('2')
})
test('title of todolist should be changed', () => {
    const endState = todoListsReducer(startState, changeTodoListTitleAC('1', newTitle))

    expect(endState[0].title).toBe(newTitle)
    expect(endState[1].title).toBe('Buy')
})
test('filter of todolist should be changed', () => {
    const newFilter = 'active'
    const endState = todoListsReducer(startState, changeTodoListFilterAC('1', newFilter))

    expect(endState[0].filter).toBe(newFilter)
    expect(endState[1].filter).toBe('all')
})
test('todolist should be removed from array with todo lists', () => {
    const endState = todoListsReducer(startState, removeTodoListAC('1'))

    expect(endState[0].id).toBe('2')
    expect(endState.length).toBe(1)
})