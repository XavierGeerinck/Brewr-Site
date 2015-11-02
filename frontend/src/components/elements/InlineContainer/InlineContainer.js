import React, { PropTypes } from 'react';
import './InlineContainer.scss';

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
