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
        ],
        search: '',
        filter: 'active'
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

    search = (data, search) => {
        if (search === 0) {
            return data
        }
        return data.filter(el => el.label
            .toLowerCase().indexOf(search.toLowerCase()) > -1);
    };

    onSearch = (search) => {
        this.setState({ search })
    };

    filter = (data, filter) => {
        switch (filter) {
            case 'all':
                return data;
            case 'active':
                return data.filter(el => !el.done);
            case 'done':
                return data.filter(el => el.done);
            default:
                return data;
        }
    };

    onFilter = (filter) => {
        this.setState({ filter })
    };

    render() {
        const { todoData, search, filter } = this.state;

        const filtered = this.filter(
            this.search(todoData, search), filter);
        const doneCount = todoData
            .filter(el => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel onSearch={this.onSearch}/>
                    <ItemStatusFilter
                        filter={filter}
                        onFilter={this.onFilter}
                    />
                </div>
                <TodoList
                    data={filtered}
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
