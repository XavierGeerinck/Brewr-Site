import React, { PropTypes } from 'react';
import List from '../List';
import ListItem from '../ListItem';
import Input from '../Input';
import Button from '../Button';

/**
 * A Crud list is able to add items, remove items, move items and edit items of a list.
 */
class CRUDList extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            items: this.props.items
        };
    }

    handleRemove (itemId) {
        this.setState({
            items: React.addons.update(this.state.items, { $splice: [[ itemId, 1 ]]})
        });
    }

    handleMove (item) {
        console.log(item);
    }

    render () {
        var items = [];

        this.state.items.forEach(function (item, index) {
            var key = "item-" + index;

            items.push(<ListItem value={item}
                canMove={this.props.canMove}
                canRemove={this.props.canRemove}
                onClickRemove={this.handleRemove.bind(this)}
                key={key}
                id={index}/>);
        }.bind(this));

        return (
            <div className="CRUDList">
                <h1>Add Item</h1>
                <Input type="text" isInline="true" />
                <Button text="Add" isInline="true" isForm="true" />

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
