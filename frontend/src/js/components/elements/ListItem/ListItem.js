import React, { PropTypes } from 'react';
import Button from '../Button';

class ListItem extends React.Component {
    render() {
        return (
            <li>
                {this.props.canMove ? <Button text=<i className="fa fa-align-justify"></i> isForm="true"/>  : '' }
                {this.props.value}
                {this.props.canRemove ? <Button text=<i className="fa fa-remove"></i> isForm="true"/>  : '' }
            </li>
        );
    }
};

ListItem.propTypes = {
    value: PropTypes.string,
    canRemove: PropTypes.bool,
    canMove: PropTypes.bool
};

ListItem.defaultProps = {
    value: '',
    canRemove: false,
    canMove: false
};

export default ListItem;
