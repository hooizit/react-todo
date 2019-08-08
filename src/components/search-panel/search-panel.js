import React from 'react';

import './search-panel.css'

const SearchPanel = ({ onSearch }) => {

    return <input
        type="text"
        placeholder="Search"
        className="form-control search-input"
        onChange={e => onSearch(e.target.value)}
    />
};

export default SearchPanel;