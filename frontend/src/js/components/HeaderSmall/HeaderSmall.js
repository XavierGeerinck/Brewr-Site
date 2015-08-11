/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import Navigation from '../Navigation';
import Logo from '../Logo';

export default React.createClass({
  propTypes: {
  },

  getDefaultProps() {
    return {
    }
  },

  render() {
    return (
      <div className="HeaderSmall">
        <div className="HeaderSmall-container">
          <Logo />
          <Navigation className="HeaderSmall-nav" />
          <div className="clear"></div>
        </div>
      </div>
    );
  }

});
