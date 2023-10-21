import {id_1, id_2} from "./tasks";

export type FilterType = 'all' | 'completed' | 'active'

export type TodoListsType = {
    id: string
    title: string
    filter: FilterType
}

export const todoLists: TodoListsType[] = [
    {id: id_1, title: 'Learn', filter: 'all'},
    {id: id_2, title: 'Buy', filter: 'all'}
]