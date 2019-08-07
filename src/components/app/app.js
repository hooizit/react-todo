import React, {Component} from 'react';

import AppHeader from '../app-header/app-header'
import SearchPanel from '../search-panel/search-panel'
import TodoList from '../todo-list'
import ItemStatusFilter from '../item-status-filter'
import ItemAddForm from '../item-add-form'

import './app.css'


export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')
        ]
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    };

    deleteItem = (id) => {
        this.setState(({todoData}) => {
           const idx = todoData.findIndex((el) => el.id === id);

           const doNotChangeStateDirectly = [
               ...todoData.slice(0, idx),
               ...todoData.slice(idx + 1)
           ];

            return {
               todoData: doNotChangeStateDirectly
            };
        });
    };

    addItem = (text) => {
        const newItem = this.createTodoItem(text);

        this.setState(({todoData}) => {
            const doNotChangeStateDirectly = [
                ...todoData,
                newItem
            ];

            return {
                todoData: doNotChangeStateDirectly
            }
        });
    };

    toggleProperty(arr, id, property) {
        const idx = arr.findIndex((el) => el.id === id);

        const oldItem = arr[idx];
        const newItem = {...oldItem,
            [property]: !oldItem[property]};

        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    }

    onToggleDone = (id) => {
        this.setState(({todoData}) => {

            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        });
    };

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {

            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        });
    };

    render() {
        const { todoData } = this.state;
        const doneCount = todoData
            .filter(el => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel/>
                    <ItemStatusFilter />
                </div>
                <TodoList
                    data={todoData}
                    onDeleted={ this.deleteItem }
                    onToggleDone={this.onToggleDone}
                    onToggleImportant={this.onToggleImportant}
                />
                <ItemAddForm
                    onAdd={ this.addItem }
                />
            </div>
        );
    }
};
