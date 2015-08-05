/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import styles from './Header.css';
import withStyles from '../../decorators/withStyles';
import Link from '../../utils/Link';
import Navigation from '../Navigation';
import Button from '../Button';

@withStyles(styles)
class Header {

  render() {
    return (
      <div className="Header">
        <div className="Header-container">
          <a className="Header-brand" href="/" onClick={Link.handleClick}>
            <img className="Header-brandImg" src={require('./logo.png')} width="38" height="38" alt="React" />
            <span className="Header-brandTxt">Brewr</span>
          </a>

          <Navigation className="Header-nav" />

          <div className="Header-banner">
            <h1 className="Header-bannerTitle">Simple development environments.</h1>
            <p className="Header-bannerDesc">Easily create and share environments with your team. Learn more.</p>
          </div>

          <form action="">
    				<input type="email" placeholder="Email address" />
    				<input type="password" placeholder="Password" />
    				<Button text="Get started for free" color="accent" isBig="true" />

    				<p className="Header-formDetails">Free 10 day "Organization" plan trial. No credit card required.</p>
    			</form>
        </div>
      </div>
    );
  }

}

export default Header;
