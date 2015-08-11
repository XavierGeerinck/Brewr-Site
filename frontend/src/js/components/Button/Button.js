/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './Button.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class Button {

  static propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    isInline: PropTypes.bool,
    isForm: PropTypes.bool
  };

  static defaultProps = {
    text: "",
    color: "Orange",
    isInline: true,
    isForm: false
  };

  render() {
    var className = "Button";

    if (this.props.color) {
      className += " Button-Color-" + this.props.color;
    }

    if (this.props.isInline) {
      className += " Button-Inline";
    }

    if (this.props.isForm) {
      className += " Button-Form";
    }

    return (
      <button className={className}>{this.props.text}</button>
    );
  }

}

export default Button;
