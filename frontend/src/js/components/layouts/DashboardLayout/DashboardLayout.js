import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';

class DashboardLayout extends React.Component {
  render() {
    return (
      <div className="DashboardLayout-Container">
        <SideMenu />

        <div className="DashboardLayout-Content">
          <div className="DashboardLayout-Page-Title">
            <h1>PAGE TITLE</h1>
          </div>

          <div className="DashboardLayout-Page-Container">
            <div className="DashboardLayout-Page-Content">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DashboardLayout.defaultProps = {

};

DashboardLayout.propTypes = {

};

export default DashboardLayout;
