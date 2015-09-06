import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';
import './DashboardLayout.css';

class DashboardLayout extends React.Component {
    render() {
        return (
            <div className="DashboardLayout-Container">
                <SideMenu />

                <div className="DashboardLayout-Content">
                    <div className="DashboardLayout-Page-Header">
                        <ul>
                            <li><a href=""><i className="fa fa-bell"></i></a></li>
                            <li><a href=""><i className="fa fa-bell"></i></a></li>
                            <li><a href=""><i className="fa fa-bell"></i></a></li>
                        </ul>
                    </div>

                    <div className="DashboardLayout-Page-Container">
                        <div className="DashboardLayour-Page-Title">
                            Environment Builder Wizard
                        </div>

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
