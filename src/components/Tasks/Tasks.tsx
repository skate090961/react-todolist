import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import {RootReducerType} from "../../store/rootReducer"
import {TaskType} from "../../data/tasks"
import Task from "./Task/Task"
import AddElement from "../AddElement/AddElement"
import {addTaskAC} from "../../store/reducers/tasks-reducer/tasksReducer"
import {FilterType} from "../../data/todoLists"
import s from './Tasks.module.scss'

type TasksPropsType = {
    todoId: string
    filter: FilterType
}

const Tasks: React.FC<TasksPropsType> = ({
                                             todoId,
                                             filter
                                         }) => {
    const tasks = useSelector<RootReducerType, TaskType[]>(state => state.tasks[todoId])

    const changeTaskFilter = (filter: FilterType): TaskType[] => {
        switch (filter) {
            case 'active':
                return tasks.filter(t => !t.isDone)
            case 'completed':
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    const filteredTask = changeTaskFilter(filter)

    const taskElements = filteredTask.map(task => <Task key={task.id} task={task} todoId={todoId}/>)
    const dispatch = useDispatch()

    const addTask = (title: string) => {
        dispatch(addTaskAC(todoId, title))
    }

    return (
        <div className={s.tasks}>
            <AddElement onChange={addTask} placeholder={'...add task'}/>
            <ul>
                {taskElements}
            </ul>
        </div>
    )
}

export default React.memo(Tasks)