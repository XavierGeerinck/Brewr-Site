/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './Footer.css';
import withViewport from '../../decorators/withViewport';
import withStyles from '../../decorators/withStyles';
import Link from '../../utils/Link';

@withViewport
@withStyles(styles)
class Footer {

  static propTypes = {
    viewport: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }).isRequired
  };

  render() {
    // This is just an example how one can render CSS
    let { width, height } = this.props.viewport;
    this.renderCss(`.Footer-viewport:after {content:' ${width}x${height}';}`);

    return (
      <div className="Footer">
        <div className="Footer-container">
          <div className="row">
            {/* Logo + Social */}
            <div className="col-md-3">
              <a href="http://brewr.io" className="Footer-Logo">Brewr</a>
              <div className="Footer-SocialLinks">
                <a href="#" onClick={Link.handleClick}>
                  <i class="fa fa-facebook"></i>
                </a>
                <a href="#" onClick={Link.handleClick}>
                  <i class="fa fa-twitter"></i>
                </a>
                <a href="#" onClick={Link.handleClick}>
                  <i class="fa fa-github"></i>
                </a>
              </div>
            </div>

            {/* Our Service */}
            <div className="col-md-3">
              <h2>Our Service</h2>
              <ul>
                <li><a href="#" onClick={Link.handleClick}>Pricing</a></li>
                <li><a href="#" onClick={Link.handleClick}>Features</a></li>
                <li><a href="#" onClick={Link.handleClick}>Sign in</a></li>
                <li><a href="#" onClick={Link.handleClick}>Register</a></li>
              </ul>
            </div>

            {/* Company */}
            <div className="col-md-3">
              <h2>Company</h2>
              <ul>
                <li><a href="#" onClick={Link.handleClick}>About Us</a></li>
                <li><a href="#" onClick={Link.handleClick}>Team</a></li>
                <li><a href="#" onClick={Link.handleClick}>Contact</a></li>
                <li><a href="#" onClick={Link.handleClick}>FAQ</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="col-md-3">
              <h2>Our Service</h2>
              <ul>
                <li><a href="#" onClick={Link.handleClick}>Terms</a></li>
                <li><a href="#" onClick={Link.handleClick}>Privacy</a></li>
                <li><a href="#" onClick={Link.handleClick}></a></li>
                <li><a href="#" onClick={Link.handleClick}></a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="Footer-copyright">
          Copyright © 2015 Brewr
        </div>
      </div>
    );
  }

}

export default Footer;
