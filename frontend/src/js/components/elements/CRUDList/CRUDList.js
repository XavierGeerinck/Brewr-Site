import React, { PropTypes } from 'react';
import update from 'react/lib/update';
import List from '../List';
import ListItem from '../ListItem';
import Input from '../Input';
import Button from '../Button';
import TabContainer from '../TabContainer';
import TabItem from '../TabContainer/TabItem';
import './CRUDList.css';

// Drag and drop functionallity of the listitems
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import { DragDropContext } from 'react-dnd';

/**
* A Crud list is able to add items, remove items, move items and edit items of a list.
*/
class CRUDList extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            items: props.items.map((item, index) => {
                return {
                    value: item.value ? item.value : item,
                    id: index
                };
            })
        }
    }

    handleAdd () {
        var self = this;
        var value = this.refs.add_value.state.value;
        this.refs.add_value.state.value = "";

        if (value === undefined || value === '') {
            return;
        }

        this.setState({
            items: update(this.state.items, { $push: [
                {
                    value: value,
                    id: self.state.items.length + 1
                }
            ]})
        });
    }

    handleRemove (itemId) {
        const { items } = this.state;
        const item = items.filter(i => i.id === itemId)[0];
        const itemIndex = items.indexOf(item);

        this.setState({
            items: update(this.state.items, { $splice: [[ itemIndex, 1 ]]})
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

    handleUpload () {

    }

    render () {
        const { items } = this.state;
        const { canMove, canRemove, canUploadFile } = this.props;

        return (
            <div className="CRUDList">
                <h1>Add Item</h1>

                <TabContainer>
                    {
                        canUploadFile ?
                        <TabItem text="Upload File">
                            <form onsubmit="this.reset(); return false;">
                                <Input type="file" label="Upload File" isInline="true" ref="add_file" />
                                <Input type="text" />
                                <Button text="Upload" type="submit" isForm="true" onClick={this.handleUpload.bind(this)} />
                            </form>
                        </TabItem>
                        : null
                    }

                    <TabItem text="Replace With Existing File">
                        <form onsubmit="this.reset(); return false;">
                            <Input type="text" isInline="true" ref="add_value" />
                            <Button text="Add" type="submit" isInline="true" isForm="true" onClick={this.handleAdd.bind(this)} />
                        </form>
                    </TabItem>
                </TabContainer>

                { items.length > 0 ?
                    <div>
                        <h1>Items</h1>
                        <List>
                            {items.map((item, index) => {
                                return (
                                    <ListItem value={item.value}
                                        canMove={canMove}
                                        canRemove={canRemove}
                                        onClickRemove={this.handleRemove.bind(this)}
                                        moveItem={this.handleMove.bind(this)}
                                        key={"item" + item.id}
                                        id={item.id}/>
                                );
                            })}
                        </List>
                    </div>
                    : null }
                </div>
            );
        }
    };

    CRUDList.propTypes = {
        items: PropTypes.array,
        canMove: PropTypes.bool,
        canRemove: PropTypes.bool,
        canEdit: PropTypes.bool,
        canAdd: PropTypes.bool,
        canUploadFile: PropTypes.bool, // Allows for file uploading
        withFileUploadDestination: PropTypes.bool // Allows us to set a destination for the uploaded file
    };

    CRUDList.defaultProps = {
        items: [],
        canMove: true,
        canRemove: true,
        canAdd: true,
        canEdit: false,
        canUploadFile: false,
        withFileUploadDestination: false
    };

    export default DragDropContext(HTML5Backend)(CRUDList);
