import React, {useCallback} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {RootReducerType} from "../../store/rootReducer"
import {TaskType} from "../../data/tasks"
import Task from "./Task/Task"
import AddElement from "../AddElement/AddElement"
import {addTaskAC} from "../../store/reducers/tasks-reducer/tasksReducer"
import {FilterType} from "../../data/todoLists"

type TasksPropsType = {
    todoId: string
    filter: FilterType
}

const Tasks: React.FC<TasksPropsType> = ({
                                             todoId,
                                             filter
                                         }) => {
    const tasks = useSelector<RootReducerType, TaskType[]>(state => state.tasks[todoId])

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

    const taskElements = filteredTask.map(task => <Task key={task.id} task={task} todoId={todoId}/>)
    const dispatch = useDispatch()

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(todoId, title))
    }, [])

    return (
        <div>
            <div>
                <AddElement onChange={addTask} placeholder={'...add task'}/>
                <ul>
                    {taskElements}
                </ul>
            </div>
        </div>
    )
}

export default React.memo(Tasks)