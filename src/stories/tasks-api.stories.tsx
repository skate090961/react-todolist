import React, {useEffect, useState} from "react";
import {TaskEntityType, tasksAPI} from "../api/tasks-api";

export default {
    title: 'API/Tasks'
}

export const GetTasks = () => {
    const [state, setState] = useState<TaskEntityType[]>([])
    const [todoListId, setTodoListId] = useState<string>('')

    const getTasksHandler = () => {
        tasksAPI.getTasks(todoListId)
            .then(res => {
                setState(res.data.items)
            })
    }

    const tasksListRender = state.map(s =>
        <li style={{marginTop: '10px'}}>
            <div style={{fontWeight: 'bold'}}>id: {s.id}</div>
            <div style={{fontWeight: 'bold'}}>todoListId: {s.todoListId}</div>
            <div>title: {s.title}</div>
            <div>order: {s.order}</div>
            <div>description: {s.description}</div>
            <div>status: {s.status}</div>
            <div>priority: {s.priority}</div>
            <div>startDate: {s.startDate}</div>
            <div>deadline: {s.deadline}</div>
        </li>
    )

    return (
        <div>
            <label>TodoList ID: </label>
            <input
                value={todoListId}
                onChange={(e) => setTodoListId(e.currentTarget.value)}
                placeholder={'...add todolist id'}
            />
            <button onClick={getTasksHandler}>Get Tasks</button>
            <div>{!state.length ? '' : tasksListRender}</div>
        </div>
    )
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const createTasksHandler = () => {
        tasksAPI.createTask(todoListId, title)
            .then(res => {
                setState(res.data)
            })
        setTitle('')
    }

    return <div>
        <div>
            <label>TodoList ID: </label>
            <input
                value={todoListId}
                onChange={(e) => setTodoListId(e.currentTarget.value)}
                placeholder={'...add todolist id'}
            />
        </div>
        <div>
            <label>Task Title: </label>
            <input
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
                placeholder={'...add task title'}
            />
        </div>
        <button onClick={createTasksHandler}>Create Task</button>
        <div> Response of Server: {JSON.stringify(state)}</div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const removeTaskHandler = () => {
        tasksAPI.deleteTask(todolistId, taskId)
            .then(res => {
                setState(res.data)
            })
        setTaskId('')
    }
    return (
        <div>
            <div>
                <label>Todolist ID: </label>
                <input
                    placeholder={'...id of todo'}
                    value={todolistId}
                    onChange={(e) => setTodolistId(e.currentTarget.value)}
                />
            </div>
            <div>
                <label>Task ID: </label>
                <input
                    placeholder={'...title of todo'}
                    value={taskId}
                    onChange={(e) => setTaskId(e.currentTarget.value)}
                />
            </div>
            <button onClick={removeTaskHandler}>Remove Task</button>
            <div>Response of server: {JSON.stringify(state)}</div>
        </div>
    )
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = '0ef6edde-d530-49f9-be5d-79eadbdf5166'
        const taskId = '697a88a2-3216-4b71-a448-bc7288ccc3fb'
        const model = {
            title: 'MAX !! NEW TITLE',
            description: '',
            status: 5,
            priority: 1,
            startDate: '2023-11-06T08:20:32.49',
            deadline: '2023-11-06T08:20:32.49',
        }
        tasksAPI.updateTask(todoId, taskId, model)
            .then(s => {
                setState(s.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}