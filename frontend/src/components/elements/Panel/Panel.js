import styles from './Panel.scss';
import fa from 'font-awesome/css/font-awesome.css';
import React, { PropTypes } from 'react';
import Tooltip from "../Tooltip";
import cx from 'classnames';

class Panel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var className = cx(
            styles['Panel'],
            this.props.size === 'full' ? styles['Panel-Full'] : null,
            this.props.size === 'a-third' ? styles['Panel-A-Third'] : null,
            this.props.size === 'half' ? styles['Panel-Half'] : null
        );

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
            <span className={styles['Panel-HelpIcon']}>
                <Tooltip text={this.props.tooltip} placement='top'><i className={cx(fa.fa, fa['fa-question-circle'])}/></Tooltip>
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
