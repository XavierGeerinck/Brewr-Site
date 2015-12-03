import styles from './List.scss';

import React, { PropTypes } from 'react';

class List extends React.Component {
    render() {
        return (
            <ul className={styles.List}>
                {this.props.children}
            </ul>
        );
    }
};

export default List;
