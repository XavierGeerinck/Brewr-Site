import React, { PropTypes } from 'react';
import './Divider.scss';
import cx from 'classnames';

class Divider extends React.Component {
    render() {
        var className = cx({
            'Divider': true,
            'Divider-Horizontal': this.props.align === 'horizontal',
            'Divider-Vertical': this.props.align === 'vertical',
        });

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
