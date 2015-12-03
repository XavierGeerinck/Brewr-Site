import React, { PropTypes } from 'react';
import styles from './Button.scss';
import cx from 'classnames';
import purecss from 'purecss/build/pure.css';

class Button extends React.Component {
    render() {
        var className = cx(
            this.props.color.toLowerCase() === 'orange' ? styles['Button-Color-Orange'] : null,
            this.props.color.toLowerCase() === 'white' ? styles['Button-Color-White'] : false,
            this.props.isInline ? styles['Button-Inline'] : null,
            this.props.isForm ? styles['Button-Form'] : null,
            this.props.isDragIcon ? styles['Button-DragIcon'] : null,
            this.props.align.toLowerCase() === 'right' ? styles['Button-Align-Right'] : null,
            this.props.align.toLowerCase() === 'left' ? styles['Button-Align-Left'] : null,
            styles.Button,
            styles['pure-button'],
            styles['pure-button-primary']
        );

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
