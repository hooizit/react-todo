import React from 'react';
import TodoListItem from './todo-list-item'
const TodoList = ({ data }) => {

    const list = data.map((el) => {
        return (
            <li>
                <TodoListItem
                    label={el.label}
                    important={el.important}
                    />
            </li>
        );
    });

    return (
        <ul>
            {list}
        </ul>
    );
};

export default TodoList;