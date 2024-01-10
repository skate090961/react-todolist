import {
  changeTaskEntityStatusAC,
  removeTaskAC,
  tasksSlice,
  tasksThunks,
  TasksType,
  UpdateDomainTaskModelType,
} from "features/Tasks/model/tasksSlice"
import { TaskPriorities, TaskStatuses } from "features/Tasks/api/tasksApi"
import { tasks } from "common/mocks/tasks"
import { setTodoListsAC } from "features/TodoLists/model/todoListsSlice"

const startState: TasksType = tasks
const newTitle = "NEW TASK!"

test("task should be added to array with tasks", () => {
  const startState: TasksType = {
    ["todoId_1"]: [
      {
        id: "taskId_2",
        title: "CSS",
        status: TaskStatuses.New,
        todoListId: "todoId_1",
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        entityStatus: "idle",
      },
    ],
    ["todoId_2"]: [],
  }
  const newTask = tasks["todoId_1"][0]
  const endState = tasksSlice(
    startState,
    tasksThunks.addTask.fulfilled({ task: newTask }, "requestId", { todoId: "todoId_1", title: "CSS" })
  )

  expect(endState["todoId_1"].length).toBe(2)
  expect(endState["todoId_1"][0].id).toBe("taskId_1")
  expect(endState["todoId_1"][1].id).toBe("taskId_2")
})
test("title of task should be changed", () => {
  const endState = tasksSlice(
    startState,
    tasksThunks.updateTask.fulfilled(
      {
        todoId: "todoId_1",
        taskId: "taskId_2",
        domainModel: { title: newTitle },
      },
      "requestID",
      {
        todoId: "todoId_1",
        taskId: "taskId_2",
        domainModel: { title: newTitle },
      }
    )
  )

  expect(endState["todoId_1"][0].title).toBe("HTML")
  expect(endState["todoId_1"][2].title).toBe("JavaScript")
  expect(endState["todoId_1"][1].title).toBe(newTitle)
  expect(endState["todoId_2"][1].title).toBe("Salt")
})
test("status of task should be changed", () => {
  const endState = tasksSlice(
    startState,
    tasksThunks.updateTask.fulfilled(
      {
        todoId: "todoId_1",
        taskId: "taskId_2",
        domainModel: { status: TaskStatuses.Completed },
      },
      "requestId",
      {
        todoId: "todoId_1",
        taskId: "taskId_2",
        domainModel: { status: TaskStatuses.Completed },
      }
    )
  )

  expect(endState["todoId_1"][0].status === TaskStatuses.Completed).toBeTruthy()
  expect(endState["todoId_1"][1].status === TaskStatuses.Completed).toBeTruthy()
  expect(endState["todoId_1"][2].status === TaskStatuses.Completed).toBeFalsy()
  expect(endState["todoId_2"][1].status === TaskStatuses.Completed).toBeTruthy()
})
test("task should be removed from array with tasks", () => {
  const endState = tasksSlice(startState, removeTaskAC({ todoId: "todoId_1", taskId: "taskId_2" }))

  expect(endState["todoId_1"][1].id).toBe("taskId_3")
  expect(endState["todoId_1"].length).toBe(2)
  expect(endState["todoId_2"][1].id).toBe("taskId_2")
  expect(endState["todoId_2"].length).toBe(2)
})
test("empty arrays should be added when we set todolists", () => {
  const todoLists = [
    { id: "todoId_1", title: "Learn", order: 0, addedDate: "" },
    { id: "todoId_2", title: "Buy", order: 0, addedDate: "" },
  ]

  const endState = tasksSlice({}, setTodoListsAC({ todoLists }))
  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(endState["todoId_1"]).toEqual([])
  expect(endState["todoId_2"]).toEqual([])
})
test("tasks should be set to the object", () => {
  const endState = tasksSlice(
    {
      ["todoId_1"]: [],
      ["todoId_2"]: [],
    },
    tasksThunks.fetchTasks.fulfilled({ tasks: tasks["todoId_1"], todoId: "todoId_1" }, "requestId", "todoId_1")
  )
  const keys = Object.keys(endState)

  expect(endState[keys[0]].length).toBe(3)
  expect(endState[keys[1]].length).toBe(0)
})

test("server status of task should be changed", () => {
  const endState = tasksSlice(
    startState,
    changeTaskEntityStatusAC({ todoId: "todoId_1", taskId: "taskId_2", status: "loading" })
  )

  expect(endState["todoId_1"][0].entityStatus).toBe("idle")
  expect(endState["todoId_1"][2].entityStatus).toBe("idle")
  expect(endState["todoId_1"][1].entityStatus).toBe("loading")
  expect(endState["todoId_2"][1].entityStatus).toBe("idle")
})
