import {TaskPriorities, TaskStatuses} from "../api/tasks-api";
import {TasksType} from "../store/reducers/tasks-reducer/tasksReducer";


export const tasks: TasksType = {
    ['todoId_1']: [
        {
            id: 'taskId_1',
            title: 'HTML',
            status: TaskStatuses.Completed,
            todoListId: 'todoId_1',
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Low,
            startDate: '',
        },
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
        },
        {
            id: 'taskId_3',
            title: 'JavaScript',
            status: TaskStatuses.New,
            todoListId: 'todoId_1',
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Low,
            startDate: '',
        },
    ],
    ['todoId_2']: [
        {
            id: 'taskId_1',
            title: 'Bread',
            status: TaskStatuses.New,
            todoListId: 'todoId_2',
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Low,
            startDate: '',
        },
        {
            id: 'taskId_2',
            title: 'Salt',
            status: TaskStatuses.Completed,
            todoListId: 'todoId_2',
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Low,
            startDate: '',
        },
    ]
}