import React, { PropTypes } from 'react';
import Button from '../Button';
import { DragSource, DropTarget } from 'react-dnd';
import { ItemTypes } from './Constants';

const style = {

};

const Types = {
    LIST_ITEM: 'list_item'
};

const listItemSource = {
    beginDrag(props) {
        return { id: props.id };
    }
}

const listItemTarget = {
    hover(props, monitor) {
        const draggedId = monitor.getItem().id;

        if (draggedId !== props.id) {
            props.moveItem(draggedId, props.id);
        }
    }
}

function collectSource(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

function collectTarget(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
    };
}

class ListItem extends React.Component {
    constructor (props) {
        super(props);
    }

    handleRemove() {
        this.props.onClickRemove(this.props.id);
    }

    render() {
        const { isDragging, connectDragSource, connectDropTarget, canMove, value, canRemove, onClickMove } = this.props;
        const opacity = isDragging ? 0 : 1;

        return connectDragSource(connectDropTarget(
            <li style={{ ...style, opacity }}>
                {canMove ? <Button text=<i className="fa fa-align-justify"></i> isForm="true" onClick={onClickMove.bind(this)} />  : '' }
                {value}
                {canRemove ? <Button text=<i className="fa fa-remove"></i> isForm="true" onClick={this.handleRemove.bind(this)} />  : '' }
            </li>
        ));
    }
};

ListItem.propTypes = {
    value: PropTypes.string,
    canRemove: PropTypes.bool,
    canMove: PropTypes.bool,
    id: PropTypes.number,
    onClickRemove: PropTypes.func,
    onClickMove: PropTypes.func,
    moveItem: PropTypes.func,

    // Drag and drop
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
};

ListItem.defaultProps = {
    value: '',
    canRemove: false,
    canMove: false,
    id: null,
    onClickRemove: function () {},
    onClickMove: function () {}
};

export default DragSource(Types.LIST_ITEM, listItemSource, collectSource)(DropTarget(Types.LIST_ITEM, listItemTarget, collectTarget)(ListItem));
