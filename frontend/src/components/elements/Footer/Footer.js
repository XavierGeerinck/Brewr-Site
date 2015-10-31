import React, { PropTypes } from 'react';
import styles from './Footer.css';

export default React.createClass({
  propTypes: {
  },

  getDefaultProps() {
    return {
    }
  },

  render() {
    return (
      <div className={styles.Footer}>
        <div className={styles.container}>
          <div className="row">
            {/* Logo + Social */}
            <div className="col-md-4 Footer-Company">
              <a href="http://brewr.io" className={styles.Logo}>Brewr.io</a>
              <div className={styles.SocialLinks}>
                <a href="#">
                  <i className="fa fa-facebook"></i>
                </a>
                <a href="#">
                  <i className="fa fa-twitter"></i>
                </a>
                <a href="#">
                  <i className="fa fa-github"></i>
                </a>
              </div>
            </div>

            {/* Our Service */}
            <div className="col-md-2">
              <h2>Our Service</h2>
              <ul>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Features</a></li>
                <li><a href="#">Sign in</a></li>
                <li><a href="#">Register</a></li>
              </ul>
            </div>

            {/* Company */}
            <div className="col-md-2">
              <h2>Company</h2>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Team</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">FAQ</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="col-md-2">
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
});
