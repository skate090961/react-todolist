import React, {ChangeEvent, useCallback} from 'react'
import EditableTitle from "../../../../../Shared/EditableTitle/EditableTitle"
import s from './Task.module.scss'
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import {TaskStatuses} from "../../../../../../API/tasks-api";
import {TaskDomainType} from "../../../../../../store/reducers/tasks-reducer/tasksReducer";
import {RequestStatusType} from "../../../../../../store/reducers/app-reducer/appReducer";

export type TaskPropsType = {
    task: TaskDomainType
    changeTaskTitle: (taskId: string, title: string) => void
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses) => void
    todoListEntityStatus: RequestStatusType
}

const Task: React.FC<TaskPropsType> = ({
                                           task,
                                           changeTaskTitle,
                                           removeTask,
                                           changeTaskStatus,
                                           todoListEntityStatus
                                       }) => {
    const {id, status, title, entityStatus} = task

    const isTaskDisabled = entityStatus === 'loading' || todoListEntityStatus === 'loading'

    const changeTaskTitleHandler = useCallback((title: string) => {
        changeTaskTitle(id, title)
    }, [changeTaskTitle])

    const removeTaskHandler = useCallback(() => {
        removeTask(id)
    }, [removeTask])

    const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
    }, [changeTaskStatus])

    return (
        <li className={s.task}>
            <div className={s.check_title}>
                <Checkbox
                    size="small"
                    checked={status === TaskStatuses.Completed}
                    onChange={changeTaskStatusHandler}
                    disabled={isTaskDisabled}
                />
                <EditableTitle title={title} onChangeTitle={changeTaskTitleHandler} disabled={isTaskDisabled}/>
            </div>
            <IconButton
                onClick={removeTaskHandler}
                color={"default"}
                sx={{'&:hover': {color: '#d32f2f'}}}
                disabled={isTaskDisabled}
            >
                <DeleteOutlineOutlinedIcon/>
            </IconButton>
        </li>
    );
}


export default React.memo(Task)