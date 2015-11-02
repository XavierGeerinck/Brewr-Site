import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Logo from '../Logo';
import styles from './HeaderSmall.scss';
import cx from 'classnames';

class HeaderSmall extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return this.props.user ? this.renderLoggedIn() : this.renderNotLoggedIn();
    }

    renderLoggedIn() {
        return (
            <div className={styles.HeaderSmall}>
                <div className={styles.container}>
                    <Logo />

                    <div className={styles.Navigation}>
                        <Link to="/">Home</Link>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/projects">Projects</Link>
                        <Link to="/logout" className={cx(styles.button, styles.white)}>Logout</Link>
                    </div>

                    <div className={styles.clear}></div>
                </div>
            </div>
        );
    }

    renderNotLoggedIn() {
        return (
            <div className={styles.HeaderSmall}>
                <div className={styles.container}>
                    <Logo align="left" />

                    <div className={styles.Navigation}>
                        <Link to="/">Home</Link>
                        <Link to="/tour">Tour</Link>
                        <Link to="/pricing">Pricing</Link>
                        <Link to="/login">Sign in</Link>
                        <Link to="/register" className={cx(styles.button, styles.white)}>Sign up</Link>
                    </div>

                    <div className={styles.clear}></div>
                </div>
            </div>
        );
    }
}

HeaderSmall.defaultProps = {
    user: null
};

HeaderSmall.propTypes = {
    user: PropTypes.object
};

export default HeaderSmall;
