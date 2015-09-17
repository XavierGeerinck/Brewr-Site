import React, { PropTypes } from 'react';

class DropdownMenuItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="DropdownMenuItem">
                {this.props.children}
            </div>
        );
    }
};

DropdownMenuItem.propTypes = {

};

DropdownMenuItem.defaultProps = {

};

export default DropdownMenuItem;
