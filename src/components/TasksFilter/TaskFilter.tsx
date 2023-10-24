import {FilterType} from "../../data/todoLists"
import React, {useCallback} from "react"
import {useDispatch} from "react-redux"
import {changeTodoListFilterAC} from "../../store/reducers/todoLists-reducer/todoListsReducer"
import {Button} from "@mui/material"
import s from './TaskFilter.module.scss'

type TaskFilterPropsType = {
    filter: FilterType
    todoId: string
}

const TaskFilter: React.FC<TaskFilterPropsType> = ({
                                                       filter,
                                                       todoId
                                                   }) => {
    const dispatch = useDispatch()
    const filterTaskHandler = (filter: FilterType) => {
        dispatch(changeTodoListFilterAC(todoId, filter))
    }
    const filterStyle = (CurrentFilter: FilterType) => {
        return filter === CurrentFilter ? "contained" : "outlined"
    }

    return (
        <div className={s.root}>
            <Button
                onClick={() => filterTaskHandler('all')}
                variant={filterStyle('all')}
                size={"small"}
            >All</Button>
            <Button
                onClick={() => filterTaskHandler('active')}
                variant={filterStyle('active')}
                size={"small"}
            >Active</Button>
            <Button
                onClick={() => filterTaskHandler('completed')}
                variant={filterStyle('completed')}
                size={"small"}
            >Completed</Button>
        </div>
    );
};

export default React.memo(TaskFilter)