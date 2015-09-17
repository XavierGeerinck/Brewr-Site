import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';
import './DashboardLayout.css';

class DashboardLayout extends React.Component {
    render() {
        const { title, isBoxed } = this.props;

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
                        {
                            title ?
                            <div className="DashboardLayout-Page-Title">
                                {title}
                            </div>
                            : undefined
                        }

                        {
                            isBoxed ?
                            <div className="DashboardLayout-Page-Content">
                                {this.props.children}
                            </div>
                            :
                            this.props.children
                        }
                    </div>
                </div>
            </div>
        );
    }
}

DashboardLayout.defaultProps = {
    title: "",
    isBoxed: true // Show the content in a white box
};

DashboardLayout.propTypes = {
    title: PropTypes.string,
    isBoxed: PropTypes.bool
};

export default DashboardLayout;
