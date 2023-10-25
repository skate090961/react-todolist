import React, {useCallback} from 'react'
import {TodoListsType} from "../../../data/todoLists"
import Tasks from "../../Tasks/Tasks"
import {useDispatch} from "react-redux"
import {changeTodoListTitleAC, removeTodoListAC} from "../../../store/reducers/todoLists-reducer/todoListsReducer"
import EditableTitle from "../../EditableTitle/EditableTitle"
import {Grid, IconButton, Paper} from "@mui/material"
import s from './Todolist.module.scss'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

type TodoListPropsType = {
    todoList: TodoListsType
}

const TodoList: React.FC<TodoListPropsType> = ({todoList}) => {
    const {id, title, filter} = todoList

    const dispatch = useDispatch()

    const removeTodoList = useCallback(() => {
        dispatch(removeTodoListAC(id))
    }, [])
    const changeTodoListTitle = useCallback((title: string) => {
        dispatch(changeTodoListTitleAC(id, title))
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