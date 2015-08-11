import React, { PropTypes } from 'react';

export default React.createClass({
  propTypes: {
    name: PropTypes.string
  },

  getDefaultProps() {
    return {
      name: "Brewr"
    }
  },

  render() {
    return (
      <a className="Logo" href="/">
        <img className="Logo-img" src={require('./logo.webp')} width="38" height="38" alt="Logo" />
        <span className="Logo-txt">{this.props.name}</span>
      </a>
    );
  }

});
