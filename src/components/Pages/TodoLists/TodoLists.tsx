import React, {useCallback, useEffect} from 'react';
import {useSelector} from "react-redux";
import {RootReducerType} from "../../../store/rootReducer";
import TodoList from "./TodoList/TodoList";
import AddElement from "../../Shared/AddItemForm/AddItemForm";
import {
    addTodoListTC,
    fetchTodoListsTC,
    TodoListDomainType
} from "../../../store/reducers/todoLists-reducer/todoListsReducer";
import {Grid} from "@mui/material";
import s from './Todolists.module.scss'
import {useAppDispatch} from "../../../store/store";

const TodoLists = () => {
    useEffect(() => {
        dispatch(fetchTodoListsTC())
    }, [])

    const todoLists = useSelector<RootReducerType, TodoListDomainType[]>(state => state.todoLists)
    const todoListElements = todoLists.map(todo => <TodoList key={todo.id} todoList={todo}/>)
    const dispatch = useAppDispatch()
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
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