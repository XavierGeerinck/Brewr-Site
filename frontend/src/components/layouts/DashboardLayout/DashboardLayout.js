import styles from './DashboardLayout.scss';
import purecss from 'purecss/build/grids-responsive.css';
import fa from 'font-awesome/css/font-awesome.css';
import cx from 'classnames';

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
        window.location = '/#/dashboard';
    }

    handleSideMenuChange(active) {

    }

    render() {
        var self = this;
        const { title, isBoxed, history } = this.props;
        const { user, organisations, selected_organisation } = this.state;
        const teamLink = selected_organisation ? "/organisation/" + selected_organisation.uuid + "/members" : "";
        const projects = selected_organisation ? selected_organisation.projects : [];
console.log(this.props);
        return (
            <div className={styles.Container}>
                {/* SIDEMENU */}
                <SideMenu title="brewr">
                    <SideMenuItem link="/dashboard"><i className={cx(fa.fa, fa['fa-home'])}></i>Dashboard</SideMenuItem>
                    <SideMenuItem link={teamLink}><i className={cx(fa.fa, fa['fa-group'])}></i>Members</SideMenuItem>
                    <SideMenuContainer title={<span><i className={cx(fa.fa, fa['fa-folder'])}></i><span>Projects</span></span>}>
                        {
                            projects ?
                            projects.map(p => {
                                let url = "/organisation/" + selected_organisation.uuid + "/project/" + p.id;
                                return <SideMenuItem key={p.name} link={url}>{p.name}</SideMenuItem>
                            })
                            : null
                        }
                    </SideMenuContainer>
                    <SideMenuItem link="/builder"><i className={cx(fa.fa, fa['fa-gears'])}></i>Image Creator</SideMenuItem>
                    <SideMenuItem link="/organisation/1/admin"><i className={cx(fa.fa, fa['fa-lock'])}></i>Admin</SideMenuItem>
                    <SideMenuItem link="/logout" isStickBottom={true}><i className={cx(fa.fa, fa['fa-sign-out'])}></i>Logout</SideMenuItem>
                </SideMenu>

                {/* CONTENT */}
                <div className={styles.Content}>
                    {/* HEADER */}
                    <div className={styles['Page-Header']}>
                        <div className={styles.Title}>


                            {
                                selected_organisation ?
                                <span>
                                    <DropdownMenu title={ selected_organisation.name }>
                                    {
                                        organisations.map(i => {
                                            return <DropdownMenuItem onClick={this._handleChangeCompany.bind(this)} key={i.name}>{i.name}</DropdownMenuItem>
                                        })
                                    }
                                    </DropdownMenu>
                                </span> : null
                            }

                            <Divider align="vertical" />

                            { title ? <span> {title}</span> : undefined }
                        </div>

                        <Divider align="vertical" />

                        <ul>
                            <li><a href=""><i className={cx(fa.fa, fa['fa-bell'])}></i></a></li>
                            <li><a href=""><i className={cx(fa.fa, fa['fa-bell'])}></i></a></li>
                            <li><a href=""><i className={cx(fa.fa, fa['fa-bell'])}></i></a></li>
                        </ul>

                        <div className={styles.UserPreview}>
                            <DropdownMenu title={user.name}>
                                <DropdownMenuItem>
                                    <Link to="/user/settings"><i className={cx(fa.fa, fa['fa-cog'])}></i>Settings</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link to="/logout"><i className={cx(fa.fa, fa['fa-sign-out'])}></i>Logout</Link>
                                </DropdownMenuItem>
                            </DropdownMenu>
                        </div>

                        <div className={styles.clear}></div>
                    </div>

                    {/* BODY */}
                    <div className={styles['Page-Container']}>
                        {
                            isBoxed ?
                            <div className={styles['Page-Content']}>
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
