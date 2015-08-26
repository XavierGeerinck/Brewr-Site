import React, { PropTypes } from 'react';
import update from 'react/lib/update';
import List from '../List';
import ListItem from '../ListItem';
import Input from '../Input';
import Button from '../Button';

// Drag and drop functionallity of the listitems
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import { DragDropContext } from 'react-dnd';

/**
 * A Crud list is able to add items, remove items, move items and edit items of a list.
 */
class CRUDList extends React.Component {
    constructor (props) {
        super(props);

        const { items } = props;

        this.state = {
            items: props.items.map((item, index) => {
                return {
                    value: item,
                    id: index
                };
            })
        }
    }

    handleRemove (itemId) {
        this.setState({
            items: update(this.state.items, { $splice: [[ itemId, 1 ]]})
        });
    }

    handleMove (currentId, afterId) {
        const { items } = this.state;

        const item = items.filter(i => i.id === currentId)[0];
        const afterItem = items.filter(i => i.id === afterId)[0];
        const itemIndex = items.indexOf(item);
        const afterIndex = items.indexOf(afterItem);

        this.setState(update(this.state, {
            items: {
                $splice: [
                    [ itemIndex, 1 ],
                    [ afterIndex, 0, item ]
                ]
            }
        }));
    }

    render () {
        const { items } = this.state;
        const { canMove, canRemove } = this.props;

        return (
            <div className="CRUDList">
                <h1>Add Item</h1>
                <Input type="text" isInline="true" />
                <Button text="Add" isInline="true" isForm="true" />

                <h1>Items</h1>
                <List>
                    {items.map((item, index) => {
                        return (
                            <ListItem value={item.value}
                                canMove={canMove}
                                canRemove={canRemove}
                                onClickRemove={this.handleRemove.bind(this)}
                                moveItem={this.handleMove.bind(this)}
                                key={"item" + index}
                                id={item.id}/>
                        );
                    })}
                </List>
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

export default DragDropContext(HTML5Backend)(CRUDList);
