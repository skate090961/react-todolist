import React, {useState} from "react";
import {TaskType, tasksAPI, UpdateTaskModelType} from "../api/tasks-api";

export default {
    title: 'API/Tasks'
}

export const GetTasks = () => {
    const [state, setState] = useState<TaskType[]>([])
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
            <div>{!state.length ? 'Tasks List is Empty' : tasksListRender}</div>
        </div>
    )
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<string>('')
    const [taskTitle, setTaskTitle] = useState<string>('')

    const createTasksHandler = () => {
        tasksAPI.createTask(todoListId, taskTitle)
            .then(res => {
                setState(res.data)
            })
        setTaskTitle('')
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
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.currentTarget.value)}
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
    const [todoListId, setTodoListId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [taskModel, setTaskModel] = useState<UpdateTaskModelType>({
        title: 'title',
        description: 'description',
        status: 0,
        priority: 1,
        startDate: '',
        deadline: '',
    })

    const updateTaskHandler = () => {
        tasksAPI.updateTask(todoListId, taskId, taskModel)
            .then(s => {
                setState(s.data)
            })
    }
    return (
        <div>
            <div style={{fontWeight: 'bold'}}>Find Task:</div>
            <div>
                <label>TodoList ID: </label>
                <input onChange={e => setTodoListId(e.currentTarget.value)}/>
            </div>
            <div>
                <label>Task ID: </label>
                <input onChange={e => setTaskId(e.currentTarget.value)}/>
            </div>
            <div style={{marginTop: '10px', fontWeight: 'bold'}}>Update Task:</div>
            <div>
                <label>title: </label>
                <input onChange={e => setTaskModel({...taskModel, title: e.currentTarget.value})}/>
            </div>
            <div>
                <label>description: </label>
                <input onChange={e => setTaskModel({...taskModel, description: e.currentTarget.value})}/>
            </div>
            <div>
                <label>status: </label>
                <input onChange={e => setTaskModel({...taskModel, status: Number(e.currentTarget.value)})}
                       type="number"/>
            </div>
            <div>
                <label>priority: </label>
                <input onChange={e => setTaskModel({...taskModel, priority: Number(e.currentTarget.value)})}
                       type="number"/>
            </div>
            <div>
                <label>startDate: </label>
                <input onChange={e => setTaskModel({...taskModel, startDate: e.currentTarget.value})} type="date"/>
            </div>
            <div>
                <label>deadline: </label>
                <input onChange={e => setTaskModel({...taskModel, deadline: e.currentTarget.value})} type="date"/>
            </div>
            <button onClick={updateTaskHandler}>Update Task</button>
            <div>Response of Server: {JSON.stringify(state)}</div>
        </div>
    )

}