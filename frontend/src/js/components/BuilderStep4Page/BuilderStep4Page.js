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
      <div className="BuilderStep4Page">
        {/* Add Expose */}
        <section className="sub-content flex-container">
          <div className="flex-container">
            <div id="pick-settings" className="flex-item">
              <InlineContainer>
                <Input type="text" name="input_cmd" label="Add Expose Port" placeholder="Type a port in the format port_container:port_local..." />
                <Button text="Add" isForm="true"/>
              </InlineContainer>
            </div>
          </div>
        </section>

        {/* Current Expose */}
        <section className="sub-content flex-container">
          <div className="flex-container">
            <div id="pick-settings-filled" className="flex-item">
              <h2>Commands</h2>

              <ul className="BuilderPage-List">
                <li>
                  <span>80 : 80</span>
                  <Button text=<i className="fa fa-remove"></i> isForm="true"/>
                </li>
                <li>
                  <span>3336 : 3336</span>
                  <Button text=<i className="fa fa-remove"></i> isForm="true"/>
                </li>
                <li>
                  <span>22 : 22</span>
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
