import React, {ChangeEvent, useCallback} from 'react'
import {TaskType} from "../../../data/tasks"
import EditableTitle from "../../EditableTitle/EditableTitle"
import s from './Task.module.scss'
import {Checkbox, IconButton} from "@mui/material"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"

export type TaskPropsType = {
    task: TaskType
    changeTaskTitle: (taskId: string, title: string) => void
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

const Task: React.FC<TaskPropsType> = ({
                                           task,
                                           changeTaskTitle,
                                           removeTask,
                                           changeTaskStatus
                                       }) => {
        const {id, isDone, title} = task

        const changeTaskTitleHandler = useCallback((title: string) => {
            changeTaskTitle(id, title)
        }, [changeTaskTitle])

        const removeTaskHandler = useCallback(() => {
            removeTask(id)
        }, [removeTask])

        const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(id, e.currentTarget.checked)
        }, [changeTaskStatus])

        return (
            <li className={s.task}>
                <div className={s.check_title}>
                    <Checkbox
                        size="small"
                        checked={isDone}
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