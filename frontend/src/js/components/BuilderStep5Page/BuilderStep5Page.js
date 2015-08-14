/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import SideMenu from '../SideMenu';
import Button from '../Button';
import InlineContainer from '../InlineContainer';
import Input from '../Input';
import DashboardLayout from '../DashboardLayout';

class BuilderStep5Page extends React.Component {
  render() {
    return (
      <DashboardLayout>
        <div className="BuilderStep5Page">
          {/* Add Volumes */}
          <section className="sub-content flex-container">
            <div className="flex-container">
              <div id="pick-settings" className="flex-item">
                <InlineContainer>
                  <Input type="text" name="input_cmd" label="Add Volumes" placeholder="Type a volume, format: /data..." />
                  <Button text="Add" isForm="true"/>
                </InlineContainer>
              </div>
            </div>
          </section>

          {/* Current Volumes */}
          <section className="sub-content flex-container">
            <div className="flex-container">
              <div id="pick-settings-filled" className="flex-item">
                <h2>Volumes</h2>

                <ul className="BuilderPage-List">
                  <li>
                    <span>/data</span>
                    <Button text=<i className="fa fa-remove"></i> isForm="true"/>
                  </li>
                  <li>
                    <span>/logs</span>
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

BuilderStep5Page.defaultProps = {

};

BuilderStep5Page.propTypes = {

};

export default BuilderStep5Page;
