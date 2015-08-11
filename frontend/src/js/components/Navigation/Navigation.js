/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Link from '../../utils/Link';
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
      <div className={classNames(this.props.className, 'Navigation')} role="navigation">
        <a className="Navigation-link" href="/" onClick={Link.handleClick}>Home</a>
        <a className="Navigation-link" href="/tour" onClick={Link.handleClick}>Tour</a>
        <a className="Navigation-link" href="/pricing" onClick={Link.handleClick}>Pricing</a>
        <Button text="Logout" color="White" onClick={Link.handleClick} />
      </div>
    );
  }
});
