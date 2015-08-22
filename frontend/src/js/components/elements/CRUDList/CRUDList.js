import React, { PropTypes } from 'react';
import List from '../List';
import ListItem from '../ListItem';
import Input from '../Input';
import Button from '../Button';

/**
 * A Crud list is able to add items, remove items, move items and edit items of a list.
 */
class CRUDList extends React.Component {
    handleRemove (item) {
        console.log(item);
    }

    handleMove (item) {
        console.log(item);
    }

    render () {
        var isInline = true;
        var isForm = true;
        var items = [];

        this.props.items.forEach(function (item) {
            items.push(<ListItem value={item}
                canMove={this.props.canMove}
                canRemove={this.props.canRemove}
                onClickRemove={this.handleRemove.bind(this)} />);
        }.bind(this));

        return (
            <div className="CRUDList">
                <h1>Add Item</h1>
                <Input type="text" isInline={isInline} />
                <Button text="Add" isInline={isInline} isForm={isForm} />
                <h1>Items</h1>
                <List>{items}</List>
            </div>
        );
    }
};

CRUDList.propTypes = {
    items: PropTypes.array,
    canMove: PropTypes.bool,
    canRemove: PropTypes.bool,
    canEdit: PropTypes.bool,
    canAdd: PropTypes.bool
};

CRUDList.defaultProps = {
    items: [],
    canMove: true,
    canRemove: true,
    canAdd: true,
    canEdit: false
};

export default CRUDList;
