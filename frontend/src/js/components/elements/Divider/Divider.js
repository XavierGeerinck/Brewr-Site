import React, { PropTypes } from 'react';
import './Divider.css';

class Divider extends React.Component {
    render() {
        var cx = React.addons.classSet;

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
