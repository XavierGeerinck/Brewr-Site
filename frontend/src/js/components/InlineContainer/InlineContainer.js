import React, { PropTypes } from 'react';

export default React.createClass({
  propTypes: {
  },

  getDefaultProps() {
    return {
    }
  },

  render() {
    return <div className="Inline-Container">{this.props.children}</div>;
  }
});
