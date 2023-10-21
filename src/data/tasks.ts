import {v1} from "uuid";

export const id_1 = v1()
export const id_2 = v1()

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksType = {
    [key: string]: TaskType[]
}

export const tasks: TasksType = {
    [id_1]: [
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JavaScript', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'TypeScript', isDone: true},
    ],
    [id_2]: [
        {id: v1(), title: 'Bread', isDone: false},
        {id: v1(), title: 'Salt', isDone: true},
        {id: v1(), title: 'Beer', isDone: true},
        {id: v1(), title: 'Milk', isDone: true},
    ]
}