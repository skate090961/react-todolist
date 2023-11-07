import React, {ChangeEvent, useCallback} from 'react'
import EditableTitle from "../../EditableTitle/EditableTitle"
import s from './Task.module.scss'
import {Checkbox, IconButton} from "@mui/material"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import {TaskStatuses, TaskType} from "../../../api/tasks-api";

export type TaskPropsType = {
    task: TaskType
    changeTaskTitle: (taskId: string, title: string) => void
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses) => void
}

const Task: React.FC<TaskPropsType> = ({
                                           task,
                                           changeTaskTitle,
                                           removeTask,
                                           changeTaskStatus
                                       }) => {
        const {id, status, title} = task

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
                    />
                    <EditableTitle title={title} onChangeTitle={changeTaskTitleHandler}/>
                </div>
                <IconButton
                    onClick={removeTaskHandler}
                    color={"default"}
                    sx={{'&:hover': {color: '#d32f2f'}}}
                >
                    <DeleteOutlineOutlinedIcon/>
                </IconButton>
            </li>
        );
    }


export default React.memo(Task)