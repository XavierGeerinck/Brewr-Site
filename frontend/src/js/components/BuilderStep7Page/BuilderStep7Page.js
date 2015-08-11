/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import SideMenu from '../SideMenu';
import Button from '../Button';

export default React.createClass({
  propTypes: {
  },

  getDefaultProps() {
    return {
    }
  },

  render() {
    return (
      <div className="BuilderStep7Page">
        {/* Add Volumes */}
        <section className="sub-content flex-container">
          <div className="flex-container">
            <div id="pick-settings" className="flex-item">
              <label htmlFor="input_cmd">Add Environment Variables</label>
              <input type="text" name="input_cmd" placeholder="Type a environment variable, format: ENV_VARIABLE=value" />
            </div>
          </div>
        </section>

        {/* Current Volumes */}
        <section className="sub-content flex-container">
          <div className="flex-container">
            <div id="pick-settings-filled" className="flex-item">
              <h2>Environment Variables</h2>

              <ul>
                <li>
                  ENVIRONMENT=staging
                  <a href="#" className="btn-square orange"><i className="fa fa-remove"></i></a>
                </li>
                <li>
                  TEST=test123
                  <a href="#" className="btn-square orange"><i className="fa fa-remove"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </section>

  			{/* Next Button */}
        <Button text="Next >" color="Orange" onClick={Link.handleClick} />
        <div className="clear"></div>
      </div>
    );
  }
});
