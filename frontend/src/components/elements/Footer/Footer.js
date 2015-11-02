import styles from './Footer.scss';
import purecss from 'purecss/build/grids-responsive.css';
import fa from 'font-awesome/css/font-awesome.css';
import cx from 'classnames';
import React, { PropTypes } from 'react'

class Footer extends React.Component {
    render () {
        return (
            <div className={styles.Footer}>
                <div className={styles.container}>
                    <div className={purecss['pure-g']}>
                        {/* Logo + Social */}
                        <div className={cx(purecss['pure-u-md-1-4'], styles.Company)}>
                            <a href="http://brewr.io" className={styles.Logo}>Brewr.io</a>
                            <div className={styles.SocialLinks}>
                                <a href="#">
                                    <i className={cx(fa.fa, fa['fa-facebook'])}></i>
                                </a>
                                <a href="#">
                                    <i className={cx(fa.fa, fa['fa-twitter'])}></i>
                                </a>
                                <a href="#">
                                    <i className={cx(fa.fa, fa['fa-github'])}></i>
                                </a>
                            </div>
                        </div>

                        {/* Our Service */}
                        <div className={purecss['pure-u-md-1-4']}>
                            <h2>Our Service</h2>
                            <ul>
                                <li><a href="#">Pricing</a></li>
                                <li><a href="#">Features</a></li>
                                <li><a href="#">Sign in</a></li>
                                <li><a href="#">Register</a></li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div className={purecss['pure-u-md-1-4']}>
                            <h2>Company</h2>
                            <ul>
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Team</a></li>
                                <li><a href="#">Contact</a></li>
                                <li><a href="#">FAQ</a></li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div className={purecss['pure-u-md-1-4']}>
                            <h2>Our Service</h2>
                            <ul>
                                <li><a href="#">Terms</a></li>
                                <li><a href="#">Privacy</a></li>
                                <li><a href="#"></a></li>
                                <li><a href="#"></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.copyright}>
                    Copyright © 2015 Brewr
                </div>
            </div>
        );
    }
}

export default Footer;
