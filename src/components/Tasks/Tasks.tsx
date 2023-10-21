import React from 'react';
import {useSelector} from "react-redux";
import {RootReducerType} from "../../store/rootReducer";
import {TaskType} from "../../data/tasks";
import Task from "./Task/Task";

type TasksPropsType = {
    todoId: string
}

const Tasks: React.FC<TasksPropsType> = ({
                                             todoId
                                         }) => {
    const tasks = useSelector<RootReducerType, TaskType[]>(state => state.tasks[todoId])
    const taskElements = tasks.map(task => <Task key={task.id} task={task}/>)

    return (
        <div>
            <input placeholder={'...add new task'}/>
            <ul>
                {taskElements}
            </ul>
        </div>
    );
};

export default Tasks;