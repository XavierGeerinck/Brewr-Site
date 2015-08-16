/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import InlineContainer from '../../elements/InlineContainer';
import Input from '../../elements/Input';
import DashboardLayout from '../../layouts/DashboardLayout';
import ListFile from '../../elements/ListFile';

var files = [ "/var/www:www", "/var/log:log" ];
class BuilderStep6Page extends React.Component {
  render() {
    return (
      <DashboardLayout>
        <div className="BuilderStep6Page">
          {/* Add Volumes */}
          <InlineContainer>
            <Input type="text" name="input_cmd" label="Add Files" placeholder="Type a volume, format: <host>:<container>..." />
            <Button text="Add" isForm="true"/>
          </InlineContainer>

          {/* Current Volumes */}
          <h1>Files</h1>
          <ListFile items={files} />

    			{/* Next Button */}
          <Button text="Next >" color="Orange" />
          <div className="clear"></div>
        </div>
      </DashboardLayout>
    );
  }
}

BuilderStep6Page.defaultProps = {

};

BuilderStep6Page.propTypes = {

};

export default BuilderStep6Page;
