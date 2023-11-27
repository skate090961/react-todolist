import React, {useEffect, useState} from 'react'
import {todoListsAPI, TodoListType} from "../API/todoLists-api";

export default {
    title: 'API/TodoLists'
}

export const GetTodoLists = () => {
    const [state, setState] = useState<TodoListType[]>([])
    useEffect(() => {
        todoListsAPI.getTodoLists()
            .then((data) => {
                setState(data)
            })
    }, [])
    const renderStateList = state.map(s =>
        <li style={{marginTop: '10px'}}>
            <div style={{fontWeight: 'bold'}}>id: {s.id}</div>
            <div>title: {s.title}</div>
            <div>order: {s.order}</div>
            <div>addedDate: {s.addedDate}</div>
        </li>
    )
    return (
        <ul>
            {!state.length ? <h3>TodoLists Is Empty</h3> : renderStateList}
        </ul>
    )
}
export const CreateTodoList = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const addTodoListHandler = () => {
        todoListsAPI.createTodoList(title)
            .then((res) => {
                setState(res.data.item)
            })
        setTitle('')
    }
    return (
        <div>
            <label>Todolist Title: </label>
            <input
                placeholder={'...title of todo'}
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
            />
            <button onClick={addTodoListHandler}>Add TodoList</button>
            <div>Response of server: {JSON.stringify(state)}</div>
        </div>
    )
}
export const DeleteTodoList = () => {
    const [state, setState] = useState<any>(null)
    const [value, setValue] = useState<string>('')

    const removeTodoListHandler = () => {
        todoListsAPI.deleteTodoList(value)
            .then((res) => {
                setState(res.data)
            })
        setValue('')
    }

    return (
        <div>
            <label>Todolist ID: </label>
            <input
                placeholder={'...ID of todo'}
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
            />
            <button onClick={removeTodoListHandler}>Remove TodoList</button>
            <div>Response of server: {JSON.stringify(state)}</div>
        </div>
    )
}
export const UpdateTodoListTitle = () => {
    const [state, setState] = useState<any>(null)
    const [valueId, setValueId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const removeTodoListHandler = () => {
        todoListsAPI.updateTodoList(valueId, title)
            .then((res) => {
                setState(res.data)
            })
        setValueId('')
        setTitle('')
    }

    return (
        <div>
            <div>
                <label>Todolist ID: </label>
                <input
                    placeholder={'...id of todo'}
                    value={valueId}
                    onChange={(e) => setValueId(e.currentTarget.value)}
                />
            </div>
            <div>
                <label>Todolist Title: </label>
                <input
                    placeholder={'...title of todo'}
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                />
            </div>
            <button onClick={removeTodoListHandler}>Update TodoList</button>
            <div>Response of server: {JSON.stringify(state)}</div>
        </div>
    )
}