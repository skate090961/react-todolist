import React from 'react';
import {TodoListsType} from "../../../data/todoLists";
import Tasks from "../../Tasks/Tasks";
import Filter from "./Filter/Filter";

type TodoListPropsType = {
    todoList: TodoListsType
}

const TodoList: React.FC<TodoListPropsType> = ({todoList}) => {
    const {id, title, filter} = todoList

    return (
        <div>
            <h3>{title}</h3>
            <button>X</button>
            <Tasks todoId={id}/>
            <Filter filter={filter}/>
        </div>
    );
};

export default TodoList;