import './DashboardLayout.css';
import React, { PropTypes } from 'react';
import SideMenu from '../../elements/SideMenu';
import Divider from '../../elements/Divider';
import DropdownMenu, { DropdownMenuItem } from '../../elements/DropdownMenu';
import AuthStore from '../../../stores/AuthStore';
import AuthActions from '../../../actions/AuthActions';
import { Link } from 'react-router';

class DashboardLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = this._getAuthState();
    }

    _getAuthState() {
        return {
            user: AuthStore.user
        }
    }

    componentDidMount() {
        this.changeListener = this._onChange.bind(this);
        AuthStore.addChangeListener(this.changeListener);
    }

    componentWillUnmount() {
        AuthStore.removeChangeListener(this.changeListener);
    }

    _onChange() {
        this.setState(this._getAuthState());
    }

    render() {
        const { title, isBoxed } = this.props;
        const { user } = this.state;

        return (
            <div className="DashboardLayout-Container">
                <SideMenu />

                <div className="DashboardLayout-Content">
                    <div className="DashboardLayout-Page-Header">
                        <div className="DashboardLayout-CompanyPicker">
                            <DropdownMenu title="google.com">
                                <DropdownMenuItem>brewr.io</DropdownMenuItem>
                                <DropdownMenuItem>facebook.com</DropdownMenuItem>
                            </DropdownMenu>
                        </div>

                        <Divider align="vertical" />

                        <ul>
                            <li><a href=""><i className="fa fa-bell"></i></a></li>
                            <li><a href=""><i className="fa fa-bell"></i></a></li>
                            <li><a href=""><i className="fa fa-bell"></i></a></li>
                        </ul>

                        <div className="DashboardLayout-UserPreview">
                            <DropdownMenu title="SomeUserName">
                                <DropdownMenuItem>
                                    <Link to="/user/settings"><i className="fa fa-cog"></i>Settings</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>Item 2</DropdownMenuItem>
                            </DropdownMenu>
                        </div>

                        <div className="clear"></div>
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
