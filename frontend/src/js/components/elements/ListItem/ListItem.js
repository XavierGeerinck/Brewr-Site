import React, { PropTypes } from 'react';
import Button from '../Button';

class ListItem extends React.Component {
    constructor (props) {
        super(props);
    }

    handleRemove() {
        this.props.onClickRemove(this.props.id);
    }

    render() {
        return (
            <li>
                {this.props.canMove ? <Button text=<i className="fa fa-align-justify"></i> isForm="true" onClick={this.props.onClickMove.bind(this)} />  : '' }
                {this.props.value}
                {this.props.canRemove ? <Button text=<i className="fa fa-remove"></i> isForm="true" onClick={this.handleRemove.bind(this)} />  : '' }
            </li>
        );
    }
};

ListItem.propTypes = {
    value: PropTypes.string,
    canRemove: PropTypes.bool,
    canMove: PropTypes.bool,
    id: PropTypes.number,
    onClickRemove: PropTypes.func,
    onClickMove: PropTypes.func
};

ListItem.defaultProps = {
    value: '',
    canRemove: false,
    canMove: false,
    id: null,
    onClickRemove: function () {},
    onClickMove: function () {}
};

export default ListItem;
