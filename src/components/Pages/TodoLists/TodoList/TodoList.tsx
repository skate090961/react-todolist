import React, {useCallback} from 'react'
import Tasks from "./Tasks/Tasks"
import {
    changeTodoListTitleAC, changeTodoListTitleTC,
    removeTodoListAC, removeTodoListTC,
    TodoListDomainType
} from "../../../../store/reducers/todoLists-reducer/todoListsReducer"
import EditableTitle from "../../../Shared/EditableTitle/EditableTitle"
import {Grid, IconButton, Paper} from "@mui/material"
import s from './Todolist.module.scss'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import {useAppDispatch} from "../../../../store/store";

type TodoListPropsType = {
    todoList: TodoListDomainType
}

const TodoList: React.FC<TodoListPropsType> = ({todoList}) => {
    const {id, title, filter} = todoList

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
                    <EditableTitle title={title} onChangeTitle={changeTodoListTitle}/>
                    <IconButton onClick={removeTodoList}
                                color={"default"}
                                sx={{'&:hover': {color: '#d32f2f'}}}
                    >
                        <DeleteOutlineOutlinedIcon style={{fontSize: 30}}/>
                    </IconButton>
                </div>
                <Tasks todoId={id} filter={filter}/>
            </Paper>
        </Grid>
    );
};

export default React.memo(TodoList);