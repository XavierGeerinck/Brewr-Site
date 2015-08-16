/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import InlineContainer from '../../elements/InlineContainer';
import Input from '../../elements/Input';
import DashboardLayout from '../../layouts/DashboardLayout';
import ListEnvironmentVariables from '../../elements/ListEnvironmentVariables';

var environmentVariables = ["ENVIRONMENT=staging", "TEST=test123"];

class BuilderStep7Page extends React.Component {
  render() {
    return (
      <DashboardLayout>
        <div className="BuilderStep7Page">
          {/* Add Volumes */}
          <InlineContainer>
            <Input type="text" name="input_cmd" label="Add Environment Variables" placeholder="Type a environment variable, format: ENV_VARIABLE=value" />
            <Button text="Add" isForm="true"/>
          </InlineContainer>

          {/* Current Volumes */}
          <h1>Environment Variables</h1>
          <ListEnvironmentVariables items={environmentVariables} />

    			{/* Next Button */}
          <Button text="Next >" color="Orange" />
          <div className="clear"></div>
        </div>
      </DashboardLayout>
    );
  }
}

BuilderStep7Page.defaultProps = {

};

BuilderStep7Page.propTypes = {

};

export default BuilderStep7Page;
