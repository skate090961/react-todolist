import React, {useCallback, useEffect} from 'react'
import {useSelector} from "react-redux"
import {AppRootStateType} from "../../../../../store/rootReducer"
import Task from "./Task/Task"
import AddElement from "../../../../Shared/AddItemForm/AddItemForm"
import {
    addTaskTC,
    fetchTasksTC,
    removeTaskTC,
    TaskDomainType,
    updateTaskTC
} from "../../../../../store/reducers/tasks-reducer/tasksReducer"
import TaskFilter from "./TasksFilter/TaskFilter"
import s from './Tasks.module.scss'
import {changeTodoListFilterAC, FilterType} from "../../../../../store/reducers/todoLists-reducer/todoListsReducer"
import {TaskStatuses} from "../../../../../API/tasks-api"
import {useAppDispatch} from "../../../../../hooks/useAppDispatch/useAppDispatch";
import {RequestStatusType} from "../../../../../store/reducers/app-reducer/appReducer";

type TasksPropsType = {
    todoId: string
    filter: FilterType
    disabled?: boolean
    todoListEntityStatus: RequestStatusType
}

const Tasks: React.FC<TasksPropsType> = ({
                                             todoId,
                                             filter,
                                             disabled,
                                             todoListEntityStatus
                                         }) => {
    useEffect(() => {
        dispatch(fetchTasksTC(todoId))
    }, [])
    const tasks = useSelector<AppRootStateType, TaskDomainType[]>(state => state.tasks[todoId])
    const dispatch = useAppDispatch()
    const changeTaskTitle = useCallback((taskId: string, title: string) => {
        dispatch(updateTaskTC(todoId, taskId, {title}))
    }, [])
    const removeTask = useCallback((taskId: string) => {
        dispatch(removeTaskTC(todoId, taskId))
    }, [])
    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todoId, taskId, {status}))
    }, [])
    const changeTaskFilter = useCallback((filter: FilterType) => {
        dispatch(changeTodoListFilterAC(todoId, filter))
    }, [])
    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(todoId, title))
    }, [])

    const tasksFilter = useCallback((filter: FilterType): TaskDomainType[] => {
        switch (filter) {
            case 'active':
                return tasks.filter(t => t.status === TaskStatuses.New)
            case 'completed':
                return tasks.filter(t => t.status === TaskStatuses.Completed)
            default:
                return tasks
        }
    }, [tasks])

    const filteredTask = tasksFilter(filter)

    const taskElements = filteredTask.map(task => <Task
        key={task.id}
        task={task}
        changeTaskTitle={changeTaskTitle}
        removeTask={removeTask}
        changeTaskStatus={changeTaskStatus}
        todoListEntityStatus={todoListEntityStatus}
    />)

    return (
        <div className={s.tasks}>
            <div>
                <AddElement onChange={addTask} placeholder={'...add task'} disabled={disabled}/>
                <ul>
                    {taskElements}
                </ul>
            </div>
            {tasks.length > 0 && <TaskFilter changeFilter={changeTaskFilter} filter={filter}/>}
        </div>
    )
}

export default React.memo(Tasks)