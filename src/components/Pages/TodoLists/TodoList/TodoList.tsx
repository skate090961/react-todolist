import React, {useCallback} from 'react'
import Tasks from "./Tasks/Tasks"
import {
    changeTodoListTitleTC,
    removeTodoListTC,
    TodoListDomainType
} from "../../../../store/reducers/todoLists-reducer/todoListsReducer"
import EditableTitle from "../../../Shared/EditableTitle/EditableTitle"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import s from './Todolist.module.scss'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import {useAppDispatch} from "../../../../hooks/useAppDispatch/useAppDispatch";

type TodoListPropsType = {
    todoList: TodoListDomainType
}

const TodoList: React.FC<TodoListPropsType> = ({todoList}) => {
    const {id, title, filter, entityStatus} = todoList

    const isDisabled = entityStatus === 'loading'

    const dispatch = useAppDispatch()

    const removeTodoList = useCallback(() => {
        dispatch(removeTodoListTC(id))
    }, [])
    const changeTodoListTitle = useCallback((title: string) => {
        dispatch(changeTodoListTitleTC(id, title))
    }, [])

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper elevation={4} className={s.todolist}>
                <div className={s.header}>
                    <EditableTitle title={title} onChangeTitle={changeTodoListTitle} disabled={isDisabled}/>
                    <IconButton onClick={removeTodoList}
                                color={"default"}
                                sx={{'&:hover': {color: '#d32f2f'}}}
                                disabled={isDisabled}
                    >
                        <DeleteOutlineOutlinedIcon style={{fontSize: 30}}/>
                    </IconButton>
                </div>
                <Tasks todoId={id} filter={filter} disabled={isDisabled} todoListEntityStatus={entityStatus}/>
            </Paper>
        </Grid>
    );
};

export default React.memo(TodoList);