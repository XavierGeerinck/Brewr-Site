//import React, { PropTypes } from 'react';
//import DashboardLayout from '../../layouts/DashboardLayout';
//import BaseComponent from '../../BaseComponent';
//import AuthStore from '../../../stores/AuthStore';
//import OrganisationStore from '../../../stores/OrganisationStore';
//import OrganisationActions from '../../../actions/OrganisationActions';
//// import List from '../../elements/List';
//// import ListItem from '../../elements/ListItem';
//import Button from '../../elements/Button';
//import { List, ListItem, Table, TableRow, TableHeader, TableHeaderColumn, TableBody, TableRowColumn, Avatar } from 'material-ui';
//
//export default class Team extends BaseComponent {
//    constructor(props) {
//        super(props);
//        this.state = this._getState();
//    };
//
//    _getState() {
//        return {
//            members: OrganisationStore.members,
//            managers: OrganisationStore.managers,
//            creator: OrganisationStore.creator,
//            allMembers: OrganisationStore.allMembers
//        }
//    }
//
//    componentDidMount() {
//        this.changeListener = this._onChange.bind(this);
//        OrganisationStore.addChangeListener(this.changeListener);
//        OrganisationActions.getMembers(AuthStore.token, this.props.params.organisationUUID);
//    }
//
//    componentWillUnmount() {
//        OrganisationStore.removeChangeListener(this.changeListener);
//    }
//
//    _onChange() {
//        this.setState(this._getState());
//    }
//
//    render() {
//        const { members, managers, creator, allMembers } = this.state;
//
//        return (
//            <DashboardLayout>
//                <Table
//                    height={this.state.height}
//                    fixedHeader={this.state.fixedHeader}
//                    fixedFooter={this.state.fixedFooter}
//                    selectable={this.state.selectable}
//                    multiSelectable={this.state.multiSelectable}
//                    onRowSelection={this._onRowSelection}>
//                    <TableHeader enableSelectAll={this.state.enableSelectAll}>
//                        <TableRow>
//                            <TableHeaderColumn>Avatar</TableHeaderColumn>
//                            <TableHeaderColumn>Name</TableHeaderColumn>
//                            <TableHeaderColumn>Email</TableHeaderColumn>
//                            <TableHeaderColumn>Role</TableHeaderColumn>
//                        </TableRow>
//                    </TableHeader>
//                    <TableBody
//                        deselectOnClickaway={this.state.deselectOnClickaway}
//                        showRowHover={this.state.showRowHover}
//                        stripedRows={this.state.stripedRows}>
//
//                        {
//                            allMembers.map((member) => {
//                                return (
//                                    <TableRow selected={true}>
//                                        <TableRowColumn><Avatar src={member.avatar_url} /></TableRowColumn>
//                                        <TableRowColumn>{member.name}</TableRowColumn>
//                                        <TableRowColumn>{member.email}</TableRowColumn>
//                                        <TableRowColumn>{member.role}</TableRowColumn>
//                                    </TableRow>
//                                )
//                            })
//                        }
//                    </TableBody>
//                </Table>
//
//
//            </DashboardLayout>
//        )
//    }
//}
