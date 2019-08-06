import React from 'react';

import TodoListItem from './todo-list-item'

const TodoList = ({ data }) => {

    const list = data.map((el) => {

        const {id, ...elProps} = el;

        return (
            <li className="list-group-item" key={id}>
                <TodoListItem {...elProps} />
            </li>
        );
    });

    return (
        <ul className="list-group">
            {list}
        </ul>
    );
};

export default TodoList;