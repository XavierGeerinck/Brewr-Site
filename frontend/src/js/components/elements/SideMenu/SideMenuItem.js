import React, { PropTypes } from 'react';
import { Link } from 'react-router';

class SideMenuItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { link } = this.props;

        var cx = React.addons.classSet;
        
        var className = cx({
            'SideMenuItem': true,
            'SideMenuItem-Active':  window.location && window.location.hash.indexOf(link) !== -1
        });

        return (
            <li className={className}>
                {
                    link ?
                    <Link to={link}>{this.props.children}</Link>
                    : this.props.children
                }
            </li>
        );
    }
};

SideMenuItem.propTypes = {
    isActive: PropTypes.bool,
    link: PropTypes.string
};

SideMenuItem.defaultProps = {
    isActive: false,
    link: null
};

export default SideMenuItem;
