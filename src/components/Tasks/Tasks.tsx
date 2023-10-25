import React, {useCallback} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {RootReducerType} from "../../store/rootReducer"
import {TaskType} from "../../data/tasks"
import Task from "./Task/Task"
import AddElement from "../AddElement/AddElement"
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC
} from "../../store/reducers/tasks-reducer/tasksReducer"
import {FilterType} from "../../data/todoLists"
import TaskFilter from "../TasksFilter/TaskFilter"
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
    const dispatch = useDispatch()

    const changeTaskTitle = useCallback((taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(todoId, taskId, title))
    }, [])
    const removeTask = useCallback((taskId: string) => {
        dispatch(removeTaskAC(todoId, taskId))
    }, [])
    const changeTaskStatus = useCallback((taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todoId, taskId, isDone))
    }, [])

    const changeTaskFilter = useCallback((filter: FilterType): TaskType[] => {
        switch (filter) {
            case 'active':
                return tasks.filter(t => !t.isDone)
            case 'completed':
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }, [tasks])

    const filteredTask = changeTaskFilter(filter)

    const taskElements = filteredTask.map(task => <Task
        key={task.id}
        task={task}
        changeTaskTitle={changeTaskTitle}
        removeTask={removeTask}
        changeTaskStatus={changeTaskStatus}
    />)

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(todoId, title))
    }, [])

    return (
        <div className={s.tasks}>
            <div>
                <AddElement onChange={addTask} placeholder={'...add task'}/>
                <ul>
                    {taskElements}
                </ul>
            </div>
            {tasks.length > 0 && <TaskFilter todoId={todoId} filter={filter}/>}
        </div>
    )
}

export default React.memo(Tasks)