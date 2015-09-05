import React, { PropTypes } from 'react';
import './List.css';

class List extends React.Component {
    render() {
        return (
            <ul className="List">
                {this.props.children}
            </ul>
        );
    }
};

export default List;
