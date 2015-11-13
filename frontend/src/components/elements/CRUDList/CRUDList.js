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
import forms from 'newforms';

// Drag and drop functionallity of the listitems
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

var UploadForm = forms.Form.extend({
    value_1: forms.FileField({ label: "Upload File" }),
    value_2: forms.CharField({ label: "Destination Path" })
});

var LocalFileForm = forms.Form.extend({
    value_1: forms.CharField({ label: "Source Path" }),
    value_2: forms.CharField({ label: "Destination Path" })
});

var NormalTextForm = forms.Form.extend({
    value_1: forms.CharField({ label: "Item" })
});

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

    _handleNormalText(e) {
        e.preventDefault();

        var self = this;
        var form = this.refs.normalTextForm.getForm();

        if (!form.data.value_1) {
            return;
        }

        this.setState({
            items: update(self.state.items, { $push: [
                {
                    value: form.data.value_1,
                    id: self.state.items.length + 1
                }
            ]})
        });

        form.reset();
    }

    _handleLocalFile(e) {
        e.preventDefault();

        var self = this;
        var form = this.refs.localFileForm.getForm();

        if (!form.data.value_1 || !form.data.value_2) {
            return;
        }

        this.setState({
            items: update(self.state.items, { $push: [
                {
                    value: form.data.value_1 + ':' + form.data.value_2,
                    id: self.state.items.length + 1
                }
            ]})
        });

        form.reset();
    }

    _handleUpload (e) {
        e.preventDefault();

        var self = this;
        var form = this.refs.uploadForm.getForm();

        var reader = new FileReader();
        var file = form.data.value_1;

        // Callback of the readAsDataURL
        reader.onload = function (upload) {
            self.setState({
                items: update(self.state.items, { $push: [
                    {
                        value: file.name + ':' + form.data.value_2,
                        content: upload.target.result,
                        id: self.state.items.length + 1
                    }
                ]})
            });

            // TODO: Figure out how we can show this to the html
            form.reset();
        }

        reader.readAsDataURL(file);
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

    render () {
        const { items } = this.state;
        const { canMove, canRemove, canUploadFile, addItemText, withFileUploadDestination, textAddValue } = this.props;
        let self = this;

        let tabItems = [];

        if (this.props.canUploadFile) {
            tabItems.push({ label: "Upload File", form: self._renderUploadFile.bind(self) });
        }

        if (this.props.canPickLocalFile) {
            tabItems.push({ label: "Pick Local File", form: self._renderLocalFile.bind(self)});
        }

        if (this.props.canEnterNormalText) {
            tabItems.push({ label: "Item", form: self._renderNormalText.bind(self) });
        }

        console.log(tabItems);

        return (
            <div className={styles.CRUDList}>
                <TabContainer>
                    {
                        tabItems.map((item, index) => {
                            return (
                                <TabItem key={index} text={item.label}>{item.form()}</TabItem>
                            )
                        })
                    }
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

    // Renders a upload file form
    _renderUploadFile() {
        return (
            <form role="form" onSubmit={this._handleUpload.bind(this)}>
                <forms.RenderForm form={UploadForm} ref="uploadForm" />
                <Button type="submit" text="Upload" />
            </form>
        );
    }

    // Renders a local file form, this accepts source path and destination path
    _renderLocalFile() {
        return (
            <form role="form" onSubmit={this._handleLocalFile.bind(this)}>
                <forms.RenderForm form={LocalFileForm} ref="localFileForm" />
                <Button type="submit" text="Add" />
            </form>
        );
    }

    // Renders a normal text form, just a single field
    _renderNormalText() {
        return (
            <form role="form" onSubmit={this._handleNormalText.bind(this)}>
                <forms.RenderForm form={NormalTextForm} ref="normalTextForm" />
                <Button type="submit" text="Add" />
            </form>
        )
    }
};

CRUDList.propTypes = {
    // Items
    items: PropTypes.array,

    // Operations on the items
    canMove: PropTypes.bool,
    canRemove: PropTypes.bool,
    canEdit: PropTypes.bool,
    canAdd: PropTypes.bool,

    // Type of tabs (uploadFile, localFile, plainText)
    canUploadFile: PropTypes.bool, // Allows for file uploading
    canPickLocalFile: PropTypes.bool,
    canEnterNormalText: PropTypes.bool,

    // Misc
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
    canPickLocalFile: false,
    canEnterNormalText: true,
    withFileUploadDestination: false,
    addItemText: "",
    textAddValue: "Enter Value"
};

export default DragDropContext(HTML5Backend)(CRUDList);
