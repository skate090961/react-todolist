import React, {ChangeEvent} from 'react';
import {TaskType} from "../../../data/tasks";
import EditableTitle from "../../EditableTitle/EditableTitle";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../../store/reducers/tasks-reducer/tasksReducer";
import s from './Task.module.scss'
import {Checkbox, IconButton} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

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
        <li className={s.task}>
            <div className={s.check_title}>
                <Checkbox
                    size="small"
                    checked={isDone}
                    onChange={changeTaskStatusHandler}
                />
                <EditableTitle title={title} onChangeTitle={changeTaskTitle}/>
            </div>
            <IconButton
                onClick={removeTaskHandler}
                color={"default"}
            >
                <DeleteOutlineOutlinedIcon/>
            </IconButton>
        </li>
    );
};

export default React.memo(Task);