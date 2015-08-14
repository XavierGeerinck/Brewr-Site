/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import SideMenu from '../SideMenu';
import Button from '../Button';
import InlineContainer from '../InlineContainer';
import Input from '../Input';
import DashboardLayout from '../DashboardLayout';

class BuilderStep4Page extends React.Component {
  render() {
    return (
      <DashboardLayout>
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
      </DashboardLayout>
    );
  }
}

BuilderStep4Page.defaultProps = {

};

BuilderStep4Page.propTypes = {

};

export default BuilderStep4Page;
