import fa from 'font-awesome/css/font-awesome.css';
import styles from './SideMenu.scss';

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

class SideMenuContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showItems: false
        }
    }

    showItems(e) {
        e.preventDefault();

        this.setState({
            showItems: !this.state.showItems
        })
    }

    render() {
        const { title } = this.props;
        const { showItems } = this.state;

        var className = cx(
            showItems ? styles['SideMenuContainer-Second-Level-Visible'] : styles['SideMenuContainer-Second-Level-NotVisible']
        );

        return (
            <li className={cx(styles.SideMenuContainer, styles['SideMenuContainer-Second-Level'])}>
                <a href="#" onClick={this.showItems.bind(this)}>
                    {title}
                    <i className={cx(fa.fa, fa['fa-caret-down'], styles['item-dropdown'])}></i>
                </a>

                <div className={styles.clear}></div>

                <ul className={className}>
                    {this.props.children}
                </ul>
            </li>
        );
    }
};

SideMenuContainer.propTypes = {
    title: PropTypes.any.isRequired
};

SideMenuContainer.defaultProps = {
    title: ""
};

export default SideMenuContainer;
