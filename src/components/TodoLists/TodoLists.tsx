import React from 'react';
import {useSelector} from "react-redux";
import {RootReducerType} from "../../store/rootReducer";
import {TodoListsType} from "../../data/todoLists";
import TodoList from "./TodoList/TodoList";

const TodoLists = () => {
    const todoLists = useSelector<RootReducerType, TodoListsType[]>(state => state.todoLists)
    const todoListElements = todoLists.map(todo => <TodoList key={todo.id} todoList={todo}/>)

    return (
        <div>
            {todoListElements}
        </div>
    );
};

export default TodoLists;