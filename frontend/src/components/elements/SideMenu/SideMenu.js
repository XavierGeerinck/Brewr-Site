import styles from './SideMenu.scss';
import fa from 'font-awesome/css/font-awesome.css';

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';
import SideMenuContainer from './SideMenuContainer';
import SideMenuItem from './SideMenuItem';

class SideMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { title } = this.props;

        return (
            <div className={styles.SideMenu}>
                {
                    title ?
                    <h1>
                        <Link to="/"><i className={cx(fa.fa, fa['fa-bars'])}></i><span>{title}</span></Link>
                    </h1>
                    : undefined
                }

                <ul>{this.props.children}</ul>
            </div>
        );
    }
};

SideMenu.propTypes = {
    title: PropTypes.string
};

SideMenu.defaultProps = {
    title: ""
};

SideMenu.SideMenuContainer = SideMenuContainer;
SideMenu.SideMenuItem = SideMenuItem;

export default SideMenu;
