import "./Tooltip.css";
import React, { PropTypes } from 'react';

class Tooltip extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var cx = React.addons.classSet;

        var className = cx({
            'Tooltip': true,
            'Tooltip-Right': this.props.placement === 'right' ? true : false,
            'Tooltip-Bottom': this.props.placement === 'bottom' ? true : false,
            'Tooltip-Left': this.props.placement === 'left' ? true : false,
            'Tooltip-Top': this.props.placement === 'top' ? true : false
        });

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
