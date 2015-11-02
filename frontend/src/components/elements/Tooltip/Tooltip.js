import styles from './Tooltip.scss';
import React, { PropTypes } from 'react';
import cx from 'classnames';

class Tooltip extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        var className = cx(
            styles['Tooltip'],
            this.props.placement === 'right' ? styles['Tooltip-Right'] : null,
            this.props.placement === 'bottom' ? styles['Tooltip-Bottom'] : null,
            this.props.placement === 'left' ? styles['Tooltip-Left'] : null,
            this.props.placement === 'top' ? styles['Tooltip-Top'] : null
        );

        return (
            <span className={className} data-tooltip={this.props.text}>
                {this.props.children}
            </span>
        );
    }
};

Tooltip.propTypes = {
    text: PropTypes.string,
    placement: PropTypes.string
};

Tooltip.defaultProps = {
    text: "",
    placement: "right"
};

export default Tooltip;
