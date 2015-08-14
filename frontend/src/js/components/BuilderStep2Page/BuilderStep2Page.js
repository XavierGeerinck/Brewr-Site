/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import SideMenu from '../SideMenu';
import Button from '../Button';
import Input from '../Input';
import DashboardLayout from '../DashboardLayout';

class BuilderStep2Page extends React.Component {
  render() {
    return (
      <DashboardLayout>
        <div className="BuilderStep2Page">
          {/* Search docker */}
          <section className="BuilderStep2Page-Content">
            <form>
              <div id="pick-settings" className="flex-item">
                <Input type="text" id="input_maintainer" label="Maintainer" placeholder="Enter the maintainer for the project.." />
                <Input type="text" id="input_workdir" label="Workdir" placeholder="Enter the directory where you will work from..." />
                <Input type="text" id="input_user" label="User" placeholder="Type a keyword..." />
                <Input type="text" id="input_label" label="Label" placeholder="Type a keyword..." />
              </div>
            </form>
          </section>

    			{/* Next Button */}
          <Button text="Next >" color="Orange" />
          <div className="clear"></div>
        </div>
      </DashboardLayout>
    );
  }
}

BuilderStep2Page.defaultProps = {

};

BuilderStep2Page.propTypes = {

};

export default BuilderStep2Page;
