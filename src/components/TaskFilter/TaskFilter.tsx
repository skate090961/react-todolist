import {FilterType} from "../../data/todoLists";
import React from "react";
import {useDispatch} from "react-redux";
import {changeTodoListFilterAC} from "../../store/reducers/todoLists-reducer/todoListsReducer";

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

    return (
        <div>
            <button onClick={() => filterTaskHandler('all')}>All</button>
            <button onClick={() => filterTaskHandler('active')}>Active</button>
            <button onClick={() => filterTaskHandler('completed')}>Completed</button>
        </div>
    );
};

export default TaskFilter