/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import InlineContainer from '../../elements/InlineContainer';
import Input from '../../elements/Input';
import DashboardLayout from '../../layouts/DashboardLayout';
import ListVolume from '../../elements/ListVolume';

var volumes = [ "/data", "/logs" ];

class BuilderStep5Page extends React.Component {
  render() {
    return (
      <DashboardLayout>
        <div className="BuilderStep5Page">
          {/* Add Volumes */}
          <InlineContainer>
            <Input type="text" name="input_cmd" label="Add Volumes" placeholder="Type a volume, format: /data..." />
            <Button text="Add" isForm="true"/>
          </InlineContainer>

          {/* Current Volumes */}
          <h1>Volumes</h1>
          <ListVolume items={volumes} />

    	  {/* Next Button */}
          <Button text="Next >" color="Orange" />
          <div className="clear"></div>
        </div>
      </DashboardLayout>
    );
  }
}

BuilderStep5Page.defaultProps = {

};

BuilderStep5Page.propTypes = {

};

export default BuilderStep5Page;
