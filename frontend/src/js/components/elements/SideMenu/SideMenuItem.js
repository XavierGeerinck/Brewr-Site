import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

class SideMenuItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { link, isStickBottom } = this.props;
        var className = cx({
            'SideMenuItem': true,
            'SideMenuItem-Active':  window.location && window.location.hash.indexOf(link) !== -1,
            'SideMenuItem-StickBottom': isStickBottom
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
    link: PropTypes.string,
    isStickBottom: PropTypes.bool
};

SideMenuItem.defaultProps = {
    link: null,
    isStickBottom: false
};

export default SideMenuItem;
