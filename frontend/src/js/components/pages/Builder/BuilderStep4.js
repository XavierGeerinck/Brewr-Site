/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';
import Button from '../../elements/Button';
import InlineContainer from '../../elements/InlineContainer';
import Input from '../../elements/Input';
import DashboardLayout from '../../layouts/DashboardLayout';
import ListPort from '../../elements/ListPort';

var ports = [ "80:80", "3306:3306", "8000:8000" ];
class BuilderStep4Page extends React.Component {
  render() {
    return (
      <DashboardLayout>
        <div className="BuilderStep4Page">
          {/* Add Expose */}
          <InlineContainer>
            <Input type="text" name="input_cmd" label="Add Expose Port" placeholder="Type a port in the format port_container:port_local..." />
            <Button text="Add" isForm="true"/>
          </InlineContainer>

          {/* Current Expose */}
          <h1>Ports</h1>
          <ListPort items={ports} />

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
