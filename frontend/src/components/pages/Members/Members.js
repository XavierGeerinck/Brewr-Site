import purecss from 'purecss/build/pure.css';
import React, { PropTypes } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import BaseComponent from '../../BaseComponent';
import AuthStore from '../../../stores/AuthStore';
import OrganisationStore from '../../../stores/OrganisationStore';
import OrganisationActions from '../../../actions/OrganisationActions';
import Button from '../../elements/Button';
import { Table, TableButtons } from '../../elements/Table/index.js';
import cx from 'classnames';

export default class Members extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = this._getState();
    };

    _getState() {
        return {
            members: OrganisationStore.members,
            managers: OrganisationStore.managers,
            creator: OrganisationStore.creator,
            allMembers: OrganisationStore.allMembers
        }
    }

    componentDidMount() {
        this.changeListener = this._onChange.bind(this);
        OrganisationStore.addChangeListener(this.changeListener);
        OrganisationActions.getMembers(AuthStore.token, this.props.params.organisationUUID);
    }

    componentWillUnmount() {
        OrganisationStore.removeChangeListener(this.changeListener);
    }

    _onChange() {
        this.setState(this._getState());
    }

    makeManager() {
        console.log(this.refs.table.props.children[1].props.children.props);
        console.log(this.refs.table.props.children.filter(c => {
            return c.props.selected == true
        }));
    }

    saveMemberChanges(e) {
        console.log(this.state.allMembers);
        console.log(this.refs);
        e.preventDefault();
    }

    // TODO: Make the table clickable and onclick edit a field
    // Example: When clicking a role, a dropdown should appear where we can change the role of a user.
    render() {
        const { members, managers, creator, allMembers } = this.state;

        return (
            <DashboardLayout>
                <form>
                    {/*}<TableButtons>
                        <button className={cx(purecss['pure-button'], purecss['pure-button-primary'])} onClick={this.saveMemberChanges.bind(this)}>Save</button>
                    </TableButtons>*/}

                    <Table ref="table">
                        <thead>
                            <tr>
                                <td>Avatar</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Role</td>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                allMembers.map(m => {
                                    return (
                                        <tr key={m.id}>
                                            <td><img src={m.avatar_url} /></td>
                                            <td>{m.name}</td>
                                            <td>{m.email}</td>
                                            <td>{m.role}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </Table>
                </form>
            </DashboardLayout>
        )
    }
}
