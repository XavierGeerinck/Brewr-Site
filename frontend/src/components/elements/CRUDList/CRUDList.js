import styles from './CRUDList.scss';
import purecss from 'purecss/build/pure.css';
import React, { PropTypes } from 'react';
import update from 'react/lib/update';
import List from '../List';
import ListItem from '../ListItemMove';
import Input from '../Input';
import Button from '../Button';
import Form from '../Form';
import TabContainer from '../TabContainer';
import TabItem from '../TabContainer/TabItem';
import cx from 'classnames';

// Drag and drop functionallity of the listitems
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

/**
* A Crud list is able to add items, remove items, move items and edit items of a list.
*/
class CRUDList extends React.Component {
    constructor (props) {
        super(props);

        if (props.items) {
            this.state = {
                items: props.items.map((item, index) => {
                    return {
                        value: item.value ? item.value : item,
                        content: '', // Contains content in case of a file upload! (Data_uri)
                        id: index
                    };
                })
            }
        } else {
            this.state = {
                items: []
            };
        }
    }

    handleAdd (e) {
        // Do not submit the form
        e.preventDefault();

        var self = this;
        var value = this.refs.value_1.state.value;
        this.refs.value_1.state.value = "";

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

    handleUpload (e) {
        // Do not submit the form
        e.preventDefault();

        var self = this;
        var inputBox = React.findDOMNode(this.refs.value_1).querySelector('input');
        var reader = new FileReader();
        var file = inputBox.files[0];

        // Callback of the readAsDataURL
        reader.onload = function (upload) {
            self.setState({
                items: update(self.state.items, { $push: [
                    {
                        value: file.name + ':' + self.refs.value_2.state.value,
                        content: upload.target.result,
                        id: self.state.items.length + 1
                    }
                ]})
            });

            self.refs.upload_form.getDOMNode().reset();
        }

        reader.readAsDataURL(file);
    }

    render () {
        const { items } = this.state;
        const { canMove, canRemove, canUploadFile, addItemText, withFileUploadDestination, textAddValue } = this.props;
        let self = this;

        return (
            <div className={styles.CRUDList}>
                <TabContainer>
                    {
                        canUploadFile ?
                        <TabItem text="Upload File">
                            <Form action="#" ref="upload_form" onSubmit={this.handleUpload.bind(self)} encType="multipart/form-data">
                                <Input type="file" label="Upload File" ref="value_1" />
                                <Input type="text" label="Destination Path" ref="value_2"/>
                                <Button text="Upload" type="submit" isForm="true" />
                            </Form>
                        </TabItem>
                        : null
                    }

                    <TabItem text={addItemText}>
                        <Form action="#" onsubmit="this.reset(); return false;">
                            <Input type="text" label={textAddValue} ref="value_1" />
                            { withFileUploadDestination ? <Input type="text" label="Destination Path" ref="value_2"/> : null }
                            <Button text="Add" type="submit" isInline="true" isForm="true" onClick={this.handleAdd.bind(this)} />
                        </Form>
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
    withFileUploadDestination: PropTypes.bool, // Allows us to set a destination for the uploaded file
    addItemText: PropTypes.string, // Allow for changing the add item header
    textAddValue: PropTypes.string, // Change the first textbox
};

CRUDList.defaultProps = {
    items: [],
    canMove: true,
    canRemove: true,
    canAdd: true,
    canEdit: false,
    canUploadFile: false,
    withFileUploadDestination: false,
    addItemText: "",
    textAddValue: "Enter Value"
};

export default DragDropContext(HTML5Backend)(CRUDList);
