import React, { PropTypes } from 'react';
import './TextBox.scss';

export default React.createClass({
  propTypes: {
    maxLines: PropTypes.number
  },

  getDefaultProps() {
    return {
      maxLines: 1
    }
  },

  render() {
    return (
      <div className="TextBox">
        {this.props.maxLines > 1 ?
          <textarea {...this.props} className="TextBox-input" ref="input" key="input" rows={this.props.maxLines} /> :
          <input {...this.props} className="TextBox-input" ref="input" key="input" />}
      </div>
    );
  }
});
