import styles from './TableButtons.scss';
import React, { PropTypes } from 'react';
import cx from 'classnames';

class TableButtons extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.TableButtons}>
				{this.props.children}
            </div>
        );
    }
};

TableButtons.propTypes = {

};

TableButtons.defaultProps = {

};

export default TableButtons;
