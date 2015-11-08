import fa from 'font-awesome/css/font-awesome.css';
import styles from './DropdownMenu.scss';

import React, { PropTypes } from 'react';
import DropdownMenuItem from './DropdownMenuItem';
import cx from 'classnames';

class DropdownMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    toggle(e) {
        if (this.state.isOpen) {
            this.setState({ isOpen: false });
            return;
        }

        const hideMethod = this.hide.bind(this);
        const isOpen = this.state.isOpen;
        this.setState({ isOpen: !isOpen, hideMethod: hideMethod });

        document.addEventListener('click', hideMethod, false);

        // Don't propogate further, else we will close it instantly
        e.nativeEvent.stopImmediatePropagation();
    }

    hide() {
        const hideMethod = this.state.hideMethod;
        this.setState({ isOpen: false, hideMethod: hideMethod });
        document.removeEventListener('click', hideMethod, false);
    }

    componentWillUnmount() {
        console.log(this);
        document.removeEventListener('click', this.state.hideMethod, false);
    }

    render() {
        const { isOpen } = this.state;
        const { title, children } = this.props;

        var classNameItems = cx(
            styles['DropdownMenu-Items'],
            isOpen ? styles['DropdownMenu-Items-Visible'] : null
        );

        var self = this;

        return (
            <div className={styles.DropdownMenu}>
                <div className={styles['DropdownMenu-Activator']} onClick={this.toggle.bind(this)}>
                    {title}
                </div>

                <div className={classNameItems} onClick={this.hide.bind(this)}>
                    {children}
                </div>
            </div>
        );
    }
};

DropdownMenu.propTypes = {
    title: PropTypes.any.isRequired
};

DropdownMenu.defaultProps = {
    title: ""
};

// Allow access to dropdownmenuitem
DropdownMenu.DropdownMenuItem = DropdownMenuItem;

export default DropdownMenu;
