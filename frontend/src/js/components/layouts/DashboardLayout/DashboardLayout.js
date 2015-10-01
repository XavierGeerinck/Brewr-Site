import './DashboardLayout.css';
import React, { PropTypes } from 'react';
import SideMenu, { SideMenuItem, SideMenuContainer } from '../../elements/SideMenu';
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
            user: AuthStore.user,
            organisations: AuthStore.organisations || [],
            selected_organisation: AuthStore.selected_organisation
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

    _handleChangeCompany(name) {
        AuthActions.changeSelectedCompany(name);
    }

    handleSideMenuChange(active) {

    }

    render() {
        var self = this;
        const { title, isBoxed, history } = this.props;
        const { user, organisations, selected_organisation } = this.state;
        const projects = selected_organisation ? selected_organisation.projects : [];

        return (
            <div className="DashboardLayout-Container">
                {/* SIDEMENU */}
                <SideMenu title="brewr">
                    <SideMenuItem link="/dashboard"><i className="fa fa-home"></i>Dashboard</SideMenuItem>
                    <SideMenuItem link="/organisation/1/teams"><i className="fa fa-group"></i>Teams</SideMenuItem>
                    <SideMenuContainer title={<span><i className="fa fa-folder"></i><span>Projects</span></span>}>
                        {
                            projects ?
                            projects.map(p => {
                                let url = "/organisation/" + p.organisation_id + "/project/" + p.id;
                                return <SideMenuItem key={p.name} link={url}>{p.name}</SideMenuItem>
                            })
                            : null
                        }
                    </SideMenuContainer>
                    <SideMenuItem link="/builder"><i className="fa fa-gears"></i>Image Creator</SideMenuItem>
                    <SideMenuItem link="/organisation/1/admin"><i className="fa fa-lock"></i>Admin</SideMenuItem>
                    <SideMenuItem link="/logout" isStickBottom={true}><i className="fa fa-sign-out"></i>Logout</SideMenuItem>
                </SideMenu>

                {/* CONTENT */}
                <div className="DashboardLayout-Content">
                    <div className="DashboardLayout-Page-Header">
                        {
                            selected_organisation ?
                            <div className="DashboardLayout-CompanyPicker">
                                <DropdownMenu title={ selected_organisation.name }>
                                {
                                    organisations.map(i => {
                                        return <DropdownMenuItem onClick={this._handleChangeCompany.bind(this)} key={i.name}>{i.name}</DropdownMenuItem>
                                    })
                                }
                                </DropdownMenu>
                            </div> : null
                        }

                        <Divider align="vertical" />

                        <ul>
                            <li><a href=""><i className="fa fa-bell"></i></a></li>
                            <li><a href=""><i className="fa fa-bell"></i></a></li>
                            <li><a href=""><i className="fa fa-bell"></i></a></li>
                        </ul>

                        <div className="DashboardLayout-UserPreview">
                            <DropdownMenu title={user.name}>
                                <DropdownMenuItem>
                                    <Link to="/user/settings"><i className="fa fa-cog"></i>Settings</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link to="/logout"><i className="fa fa-sign-out"></i>Logout</Link>
                                </DropdownMenuItem>
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
