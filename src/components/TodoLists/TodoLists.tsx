import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../store/rootReducer";
import {TodoListsType} from "../../data/todoLists";
import TodoList from "./TodoList/TodoList";
import AddElement from "../AddElement/AddElement";
import {addTodoListAC} from "../../store/reducers/todoLists-reducer/todoListsReducer";

const TodoLists = () => {
    const todoLists = useSelector<RootReducerType, TodoListsType[]>(state => state.todoLists)
    const todoListElements = todoLists.map(todo => <TodoList key={todo.id} todoList={todo}/>)
    const dispatch = useDispatch()
    const addTodoList = (title: string) => {
        dispatch(addTodoListAC(title))
    }

    return (
        <div>
            <AddElement onChange={addTodoList} placeholder={'...add todo'}/>
            {todoListElements}
        </div>
    );
};

export default TodoLists;