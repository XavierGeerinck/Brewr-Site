import React, { PropTypes } from 'react';
import cx from 'classnames';
import styles from './Logo.scss';

class Logo extends React.Component {
    render() {
        // var classes = cx({
        //     styles.Logo: true,
        //     styles['Align-Right']: this.props.align === 'right',
        //     styles['Align-Left']: this.props.align === 'left',
        // });

        return (
            <a className={cx(styles.Logo, styles['Align-Left'])} href="/">
                <img className={styles.img} src={require('./logo.png')} width="38" height="38" alt="Logo" />
                <span className={styles.txt}>{this.props.name}</span>
            </a>
        );
    }

}

Logo.defaultProps = {
    name: "Brewr",
    align: ""
};

Logo.propTypes = {
    name: PropTypes.string,
    align: PropTypes.string
};

export default Logo;
