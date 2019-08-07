import React from 'react';

import TodoListItem from '../todo-list-item/todo-list-item'
import './todo-list.css'

const TodoList = ({ data, onDeleted, onToggleDone, onToggleImportant }) => {

    const list = data.map((el) => {

        const {id, ...elProps} = el;

        return (
            <li className="list-group-item" key={id}>
                <TodoListItem
                    {...elProps}
                    onDeleted={() => onDeleted(id)}
                    onToggleDone={() => onToggleDone(id)}
                    onToggleImportant={() => onToggleImportant(id)}
                />
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