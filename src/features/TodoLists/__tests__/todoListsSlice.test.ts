import {
  addTodoListAC,
  changeTodoListEntityStatusAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
  setTodoListsAC,
  TodoListDomainType,
  todoListsSlice,
} from "features/TodoLists/model/todoListsSlice"
import { todoLists } from "common/mocks/todoLists"
import { RequestStatusType } from "app/appSlice"

const startState: TodoListDomainType[] = todoLists
const newTitle = "TODOLIST TITLE"
test("todolist should be added to array with todo lists", () => {
  const todoList = { id: "todoId_1", title: "Learn", order: 0, addedDate: "" }
  const startState = [todoLists[1]]
  const endState = todoListsSlice(startState, addTodoListAC({ todoList }))

  expect(endState.length).toBe(2)
  expect(endState[0].id).toBe("todoId_1")
  expect(endState[0].filter).toBe("all")
  expect(endState[1].id).toBe("todoId_2")
})
test("title of todolist should be changed", () => {
  const endState = todoListsSlice(startState, changeTodoListTitleAC({ todoId: "todoId_1", title: newTitle }))

  expect(endState[0].title).toBe(newTitle)
  expect(endState[1].title).toBe("Buy")
})
test("filter of todolist should be changed", () => {
  const newFilter = "active"
  const endState = todoListsSlice(startState, changeTodoListFilterAC({ todoId: "todoId_1", filter: newFilter }))

  expect(endState[0].filter).toBe(newFilter)
  expect(endState[1].filter).toBe("all")
})
test("todolist should be removed from array with todo lists", () => {
  const endState = todoListsSlice(startState, removeTodoListAC({ todoId: "todoId_1" }))

  expect(endState[0].id).toBe("todoId_2")
  expect(endState.length).toBe(1)
})
test("todolist should be set to the array", () => {
  const todoLists = [
    { id: "todoId_1", title: "Learn", order: 0, addedDate: "" },
    { id: "todoId_2", title: "Buy", order: 0, addedDate: "" },
  ]
  const endState = todoListsSlice([], setTodoListsAC({ todoLists }))

  expect(endState.length).toBe(2)
  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe("all")
})
test("correct entity status of todolist should be changed", () => {
  const newStatus: RequestStatusType = "loading"
  const endState = todoListsSlice(startState, changeTodoListEntityStatusAC({ todoId: "todoId_1", status: newStatus }))

  expect(endState[0].entityStatus).toBe(newStatus)
  expect(endState[1].entityStatus).toBe("idle")
})
