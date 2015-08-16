/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import Input from '../../elements/Input';
import InlineContainer from '../../elements/InlineContainer';
import { Tooltip, OverlayTrigger, } from 'react-bootstrap';
import DashboardLayout from '../../layouts/DashboardLayout';
import ListCommand from '../../elements/ListCommand';

var commands = [ "sudo apt-get install nodejs", "sudo apt-get install nodejs", "sudo apt-get install nodejs", "sudo apt-get install nodejs", "sudo apt-get install nodejs" ];
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
          <InlineContainer>
            <Input type="text" name="input_cmd" label="Add Command" placeholder="Type a command..." />
            <Button text="Add" isForm="true"/>
          </InlineContainer>

          {/* Current Command */}
          <h2>
            Commands
            <span className="BuilderPage-HelpIcon"><OverlayTrigger placement='right' overlay={tooltip}><i className="fa fa-question-circle" /></OverlayTrigger></span>
          </h2>
          <ListCommand items={commands} />

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
