/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import Button from '../Button';

export default React.createClass({
  propTypes: {
    className: PropTypes.string
  },

  getDefaultProps() {
    return {
    }
  },

  render() {
    return (
      <div className="Navigation">
        <a className="Navigation-link" href="/">Home</a>
        <a className="Navigation-link" href="/tour">Tour</a>
        <a className="Navigation-link" href="/pricing">Pricing</a>
        <Button text="Logout" color="White" />
      </div>
    );
  }
});
