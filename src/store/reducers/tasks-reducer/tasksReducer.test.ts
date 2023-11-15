import {addTaskAC, removeTaskAC, setTasksAC, tasksReducer, TasksType, updateTaskAC} from "./tasksReducer";
import {TaskPriorities, TaskStatuses} from "../../../api/tasks-api";
import {tasks} from "../../../mocks/tasks";
import {setTodoListsAC} from "../todoLists-reducer/todoListsReducer";

const startState: TasksType = tasks
const newTitle = 'NEW TASK!'

test('task should be added to array with tasks', () => {
    const startState = {
        ['todoId_1']: [
            {
                id: 'taskId_2',
                title: 'CSS',
                status: TaskStatuses.New,
                todoListId: 'todoId_1',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
            }
        ],
        ['todoId_2']: []
    }
    const newTask = tasks['todoId_1'][0]
    const endState = tasksReducer(startState, addTaskAC(newTask))

    expect(endState['todoId_1'].length).toBe(2)
    expect(endState['todoId_1'][0].id).toBe('taskId_1')
    expect(endState['todoId_1'][1].id).toBe('taskId_2')
})
test('title of task should be changed', () => {
    const endState = tasksReducer(startState, updateTaskAC('todoId_1', 'taskId_2', {title: newTitle}))

    expect(endState['todoId_1'][0].title).toBe('HTML')
    expect(endState['todoId_1'][2].title).toBe('JavaScript')
    expect(endState['todoId_1'][1].title).toBe(newTitle)
    expect(endState['todoId_2'][1].title).toBe('Salt')
})
test('status of task should be changed', () => {
    const endState = tasksReducer(startState, updateTaskAC('todoId_1', 'taskId_2', {status: TaskStatuses.Completed}))

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
test('empty arrays should be added when we set todolists', () => {
    const todoLists = [
        {id: 'todoId_1', title: 'Learn', order: 0, addedDate: ''},
        {id: 'todoId_2', title: 'Buy', order: 0, addedDate: ''}
    ]

    const endState = tasksReducer({}, setTodoListsAC(todoLists))
    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['todoId_1']).toEqual([])
    expect(endState['todoId_2']).toEqual([])
})
test('tasks should be set to the object', () => {
    const endState = tasksReducer({
            ['todoId_1']: [], ['todoId_2']: []
        },
        setTasksAC(tasks['todoId_1'], 'todoId_1')
    )
    const keys = Object.keys(endState)

    expect(endState[keys[0]].length).toBe(3)
    expect(endState[keys[1]].length).toBe(0)
})