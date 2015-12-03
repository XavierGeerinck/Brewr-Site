import styles from './Form.scss';
import React, { PropTypes } from 'react';
import cx from 'classnames';

class Form extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form className={styles.Form}>
				{this.props.children}
            </form>
        );
    }
};

Form.propTypes = {

};

Form.defaultProps = {

};

export default Form;
