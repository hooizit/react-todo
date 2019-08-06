import React from 'react';

import TodoListItem from '../todo-list-item/todo-list-item'
import './todo-list.css'

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
        <ul className="list-group todo-list">
            {list}
        </ul>
    );
};

export default TodoList;