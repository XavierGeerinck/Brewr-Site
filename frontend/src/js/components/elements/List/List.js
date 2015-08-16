import React, { PropTypes } from 'react';

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
