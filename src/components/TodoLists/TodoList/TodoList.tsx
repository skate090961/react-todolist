import React from 'react';
import {TodoListsType} from "../../../data/todoLists";
import Tasks from "../../Tasks/Tasks";
import TaskFilter from "../../TaskFilter/TaskFilter";
import {useDispatch} from "react-redux";
import {changeTodoListTitleAC, removeTodoListAC} from "../../../store/reducers/todoLists-reducer/todoListsReducer";
import EditableTitle from "../../EditableTitle/EditableTitle";

type TodoListPropsType = {
    todoList: TodoListsType
}

const TodoList: React.FC<TodoListPropsType> = ({todoList}) => {
    const {id, title, filter} = todoList
    const dispatch = useDispatch()

    const removeTodoList = () => {
        dispatch(removeTodoListAC(id))
    }
    const changeTodoListTitle = (title: string) => {
        dispatch(changeTodoListTitleAC(id, title))
    }

    return (
        <div>
            <EditableTitle title={title} onChangeTitle={changeTodoListTitle}/>
            <button onClick={removeTodoList}>X</button>
            <Tasks todoId={id} filter={filter}/>
            <TaskFilter todoId={id} filter={filter}/>
        </div>
    );
};

export default TodoList;