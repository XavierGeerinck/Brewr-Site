import React, { PropTypes } from 'react';
import cx from 'classnames';
import './Button.scss';

class Button extends React.Component {
    render() {
        var className = cx({
            'Button': true,
            'Button-Color-Orange': this.props.color.toLowerCase() === 'orange' ? true : false,
            'Button-Color-White': this.props.color.toLowerCase() === 'white' ? true : false,
            'Button-Inline': this.props.isInline ? true : false,
            'Button-Form': this.props.isForm ? true : false,
            'Button-DragIcon': this.props.isDragIcon ? true : false,
            'Button-Align-Right': this.props.align.toLowerCase() === 'right',
            'Button-Align-Left': this.props.align.toLowerCase() === 'left'
        });

        // <div className="clear"></div>
        return (
            <button type={this.props.type} className={className} onClick={this.props.onClick}>{this.props.text}</button>
        );
    }
};

Button.propTypes = {
    text: PropTypes.any,
    color: PropTypes.string,
    isInline: PropTypes.bool,
    isForm: PropTypes.bool,
    type: PropTypes.string,
    align: PropTypes.string
};

Button.defaultProps = {
    text: "",
    color: "orange",
    isInline: true,
    isForm: false,
    type: "",
    align: ''
};

export default Button;
