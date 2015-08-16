import React, { PropTypes } from 'react';

class Divider extends React.Component {
    render() {
        return (
            <div className="Divider">
                <span>{this.props.text}</span>
            </div>
        );
    }
};

Divider.propTypes = {
    text: PropTypes.string
};

Divider.defaultProps = {
    text: ''
};

export default Divider;
