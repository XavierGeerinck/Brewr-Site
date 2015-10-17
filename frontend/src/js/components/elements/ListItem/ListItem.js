import React, { PropTypes } from 'react';
import Button from '../Button';
import { ItemTypes } from './Constants';
import './ListItem.css';

const style = {

};

const Types = {
    LIST_ITEM: 'list_item'
};

class ListItem extends React.Component {
    constructor (props) {
        super(props);
    }

    handleRemove() {
        this.props.onClickRemove(this.props.id);
    }

    render() {
        const { value, canRemove } = this.props;

        return (
            <li style={{ ...style }}>
                {value}
                {this.props.children}
                {canRemove ? <Button text=<i className="fa fa-remove"></i> isForm="true" onClick={this.handleRemove.bind(this)} />  : '' }
            </li>
        );
    }
};

ListItem.propTypes = {
    value: PropTypes.string,
    canRemove: PropTypes.bool,
    id: PropTypes.number,
    onClickRemove: PropTypes.func
};

ListItem.defaultProps = {
    value: '',
    canRemove: false,
    id: null,
    onClickRemove: function () {}
};

export default ListItem;
