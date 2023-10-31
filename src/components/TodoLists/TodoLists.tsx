import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../store/rootReducer";
import {TodoListsType} from "../../data/todoLists";
import TodoList from "./TodoList/TodoList";
import AddElement from "../AddItemForm/AddItemForm";
import {addTodoListAC} from "../../store/reducers/todoLists-reducer/todoListsReducer";
import {Grid} from "@mui/material";
import s from './Todolists.module.scss'

const TodoLists = () => {
    const todoLists = useSelector<RootReducerType, TodoListsType[]>(state => state.todoLists)
    const todoListElements = todoLists.map(todo => <TodoList key={todo.id} todoList={todo}/>)
    const dispatch = useDispatch()
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListAC(title))
    }, [])

    return (
        <div className={s.todoLists}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <AddElement onChange={addTodoList} placeholder={'...add todo'}/>
                </Grid>
                {todoListElements}
            </Grid>
        </div>
    );

};

export default React.memo(TodoLists)