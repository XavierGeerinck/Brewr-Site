import React, { PropTypes } from 'react';
import './List.scss';

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
