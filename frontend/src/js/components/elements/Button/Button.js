/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';

export default React.createClass({
  propTypes: {
    text: PropTypes.string,
    color: PropTypes.string,
    isInline: PropTypes.bool,
    isForm: PropTypes.bool
  },

  getDefaultProps() {
    return {
      text: "",
      color: "Orange",
      isInline: true,
      isForm: false
    }
  },

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
      <button className={className} onClick={this.props.onClick}>{this.props.text}</button>
    );
  }

});
