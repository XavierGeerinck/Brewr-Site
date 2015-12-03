import styles from './DropdownMenu.scss';
import React, { PropTypes } from 'react';

class DropdownMenuItem extends React.Component {
    constructor(props) {
        super(props);
    }

    _handleOnClick() {
        this.props.onClick(this.props.children);

        // perform a fake click so it closes the menu
        document.body.click();
    }

    render() {
        return (
            <div className={styles.DropdownMenuItem} onClick={this._handleOnClick.bind(this)}>
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
