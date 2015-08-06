/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './Logo.css';
import Link from '../../utils/Link';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class Logo {

  static propTypes = {
    name: PropTypes.string
  };

  static defaultProps = {
    name: "Brewr"
  };

  render() {
    return (
      <a className="Logo" href="/" onClick={Link.handleClick}>
        <img className="Logo-img" src={require('./logo.png')} width="38" height="38" alt="Logo" />
        <span className="Logo-txt">{this.props.name}</span>
      </a>
    );
  }

}

export default Logo;
