/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import styles from './HeaderSmall.css';
import withStyles from '../../decorators/withStyles';
import Link from '../../utils/Link';
import Navigation from '../Navigation';
import Logo from '../Logo';

@withStyles(styles)
class Header {

  render() {
    return (
      <div className="HeaderSmall">
        <div className="HeaderSmall-container">
          <Logo />
          <Navigation className="HeaderSmall-nav" />
          <div className="clear"></div>
        </div>
      </div>
    );
  }

}

export default Header;
