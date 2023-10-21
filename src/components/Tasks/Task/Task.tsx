import React from 'react';
import {TaskType} from "../../../data/tasks";

type TaskPropsType = {
    task: TaskType
}

const Task: React.FC<TaskPropsType> = ({
                                           task
                                       }) => {
    const {id, isDone, title} = task

    return (
        <li>
            <input type="checkbox" checked={isDone}/>
            <p>{title}</p>
            <button>X</button>
        </li>
    );
};

export default Task;