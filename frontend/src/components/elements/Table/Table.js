import styles from './Table.scss';
import React, { PropTypes } from 'react';
import cx from 'classnames';

class Table extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
			<table className={styles.Table}>
				{this.props.children}
			</table>
		);
    }
}

Table.defaultProps = {
};

Table.propTypes = {
};

export default Table;
