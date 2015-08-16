/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import Input from '../../elements/Input';
import InlineContainer from '../../elements/InlineContainer';
import { Tooltip, OverlayTrigger, } from 'react-bootstrap';
import DashboardLayout from '../../layouts/DashboardLayout';

class BuilderStep3Page extends React.Component {
  render() {
    var tooltip = (
        <Tooltip>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Tooltip>
    );

    return (
      <DashboardLayout>
        <div className="BuilderStep3Page">
          {/* Add Command */}
          <section className="sub-content flex-container">
            <div className="flex-container">
              <div id="pick-settings" className="flex-item">
                <InlineContainer>
                  <Input type="text" name="input_cmd" label="Add Command" placeholder="Type a command..." />
                  <Button text="Add" isForm="true"/>
                </InlineContainer>
              </div>
            </div>
          </section>

          {/* Current Command */}
          <section className="sub-content flex-container">
            <div className="flex-container">
              <div id="pick-settings-filled" className="flex-item">
                <h2>
                  Commands
                  <span className="BuilderPage-HelpIcon"><OverlayTrigger placement='right' overlay={tooltip}><i className="fa fa-question-circle" /></OverlayTrigger></span>
                </h2>

                <ul className="BuilderPage-List">
                  <li>
                    <Button text=<i className="fa fa-align-justify"></i> isForm="true"/>
                    sudo apt-get install nodejs
                    <Button text=<i className="fa fa-remove"></i> isForm="true"/>
                  </li>
                  <li>
                    <Button text=<i className="fa fa-align-justify"></i> isForm="true"/>
                    sudo apt-get install nodejs
                    <Button text=<i className="fa fa-remove"></i> isForm="true"/>
                  </li>
                  <li>
                    <Button text=<i className="fa fa-align-justify"></i> isForm="true"/>
                    sudo apt-get install nodejs
                    <Button text=<i className="fa fa-remove"></i> isForm="true"/>
                  </li>
                  <li>
                    <Button text=<i className="fa fa-align-justify"></i> isForm="true"/>
                    sudo apt-get install nodejs
                    <Button text=<i className="fa fa-remove"></i> isForm="true"/>
                  </li>
                </ul>
              </div>
            </div>
          </section>

    			{/* Next Button */}
          <Button text=<span>Next <i className="fa fa-angle-right" /></span> color="Orange" />
          <div className="clear"></div>
        </div>
      </DashboardLayout>
    );
  }
}

BuilderStep3Page.defaultProps = {

};

BuilderStep3Page.propTypes = {

};

export default BuilderStep3Page;
