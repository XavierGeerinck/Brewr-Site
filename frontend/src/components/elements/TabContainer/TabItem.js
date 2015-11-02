import "./TabContainer.scss";
import React, { PropTypes } from 'react';

class TabItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="TabItem">
                {this.props.children}
            </div>
        )
    }
};

TabItem.propTypes = {
    title: PropTypes.string
};

TabItem.defaultProps = {
    title: ""
};

export default TabItem;
