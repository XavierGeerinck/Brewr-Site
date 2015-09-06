import React, { PropTypes } from 'react';
import "./Panel.css";
import {  Tooltip,  OverlayTrigger } from 'react-bootstrap';

class Panel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var cx = React.addons.classSet;

        var className = cx({
            'Panel': true,
            'Panel-Full': this.props.size === 'full' ? true : false,
            'Panel-A-Third': this.props.size === 'a-third' ? true : false,
            'Panel-Half': this.props.size === 'half' ? true : false,
        });

        return (
            <div className={className}>
                {this.props.heading ? this.renderHeading() : null}
                {this.props.children}
            </div>
        )
    }

    renderHeading() {
        return (
            <h1>
                {this.props.heading}
                {this.props.tooltip ? this.renderTooltip() : null}
            </h1>
        )
    }

    renderTooltip() {
        return (
            <span className="Panel-HelpIcon">
                <OverlayTrigger overlay={this.props.tooltip} placement='right'><i  className="fa fa-question-circle"/></OverlayTrigger>
            </span>
        )
    }
}

Panel.propTypes = {
    size: PropTypes.string
};

Panel.defaultProps = {
    size: "half"
};

export default Panel;
