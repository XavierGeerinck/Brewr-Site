/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './Button.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class Button {

  static propTypes = {
    text: PropTypes.string,
    color: PropTypes.string
  };

  static defaultProps = {
    text: "",
    color: "White"
  };

  render() {
    var className = "Button";

    if (this.props.color) {
      className += " Button-Color-" + this.props.color;
    }

    return (
      <button className={className}>{this.props.text}</button>
    );
  }

}

export default Button;
