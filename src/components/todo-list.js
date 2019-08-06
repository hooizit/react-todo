import React from 'react';
import TodoListItem from './todo-list-item'
const TodoList = ({ data }) => {

    const list = data.map((el) => {
        return (
            <li>
                <TodoListItem {... el} />
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