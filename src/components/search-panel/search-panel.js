import React, { Component } from 'react';

import './search-panel.css'

export default class SearchPanel extends Component {

    state = {
        search: ''
    }

    onSearch = (e) => {
        const search = e.target.value;
        this.setState({search});
        this.props.onSearch(search);
    }

    render() {

        return <input
            type="text"
            placeholder="Search"
            className="form-control search-input"
            onChange={this.onSearch}
        />
    };
}


