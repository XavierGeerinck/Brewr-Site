import styles from './Divider.scss';

import React, { PropTypes } from 'react';
import cx from 'classnames';

class Divider extends React.Component {
    render() {
        var className = cx(
            styles['Divider'],
            this.props.align === 'horizontal' ? styles['Divider-Horizontal'] : null,
            this.props.align === 'vertical' ? styles['Divider-Vertical'] : null,
        );

        return (
            <div className={className}>
                {
                    this.props.text ?
                    <span>{this.props.text}</span>
                    : undefined
                }
            </div>
        );
    }
};

Divider.propTypes = {
    text: PropTypes.string,
    align: PropTypes.string
};

Divider.defaultProps = {
    text: '',
    align: 'horizontal'
};

export default Divider;
