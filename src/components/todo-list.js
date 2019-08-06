import React from 'react';
import TodoListItem from './todo-list-item'
const TodoList = ({ data }) => {

    const list = data.map((el) => {

        const {id, ...elProps} = el;

        return (
            <li key={id}>
                <TodoListItem {...elProps} />
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