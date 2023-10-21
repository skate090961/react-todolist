import React from 'react';
import {FilterType} from "../../../../data/todoLists";

type FilterPropsType = {
    filter: FilterType
}

const Filter: React.FC<FilterPropsType> = ({
                                               filter
                                           }) => {
    return (
        <div>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    );
};

export default Filter;