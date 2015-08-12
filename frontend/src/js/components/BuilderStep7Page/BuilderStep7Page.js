/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import SideMenu from '../SideMenu';
import Button from '../Button';
import InlineContainer from '../InlineContainer';
import Input from '../Input';

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
              <InlineContainer>
                <Input type="text" name="input_cmd" label="Add Environment Variables" placeholder="Type a environment variable, format: ENV_VARIABLE=value" />
                <Button text="Add" isForm="true"/>
              </InlineContainer>
            </div>
          </div>
        </section>

        {/* Current Volumes */}
        <section className="sub-content flex-container">
          <div className="flex-container">
            <div id="pick-settings-filled" className="flex-item">
              <h2>Environment Variables</h2>

              <ul className="BuilderPage-List">
                <li>
                  <span>ENVIRONMENT=staging</span>
                  <Button text=<i className="fa fa-remove"></i> isForm="true"/>
                </li>
                <li>
                  <span>TEST=test123</span>
                  <Button text=<i className="fa fa-remove"></i> isForm="true"/>
                </li>
              </ul>
            </div>
          </div>
        </section>

  			{/* Next Button */}
        <Button text="Next >" color="Orange" />
        <div className="clear"></div>
      </div>
    );
  }
});
