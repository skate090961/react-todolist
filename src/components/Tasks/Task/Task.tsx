import React, {ChangeEvent} from 'react';
import {TaskType} from "../../../data/tasks";
import EditableTitle from "../../EditableTitle/EditableTitle";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../../store/reducers/tasks-reducer/tasksReducer";

type TaskPropsType = {
    task: TaskType
    todoId: string
}

const Task: React.FC<TaskPropsType> = ({
                                           task,
                                           todoId
                                       }) => {
    const {id, isDone, title} = task
    const dispatch = useDispatch()

    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC(todoId, id, title))
    }
    const removeTaskHandler = () => {
        dispatch(removeTaskAC(todoId, id))
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(todoId, id, e.currentTarget.checked))
    }

    return (
        <li>
            <input type="checkbox" checked={isDone} onChange={changeTaskStatusHandler}/>
            <EditableTitle title={title} onChangeTitle={changeTaskTitle}/>
            <button onClick={removeTaskHandler}>X</button>
        </li>
    );
};

export default Task;