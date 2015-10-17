import React, { PropTypes } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import BaseComponent from '../../BaseComponent';
import AuthStore from '../../../stores/AuthStore';
import OrganisationStore from '../../../stores/OrganisationStore';
import OrganisationActions from '../../../actions/OrganisationActions';
import List from '../../elements/List';
import ListItem from '../../elements/ListItem';
import Button from '../../elements/Button';

export default class Team extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = this._getState();
    };

    _getState() {
        return {
            members: OrganisationStore.members,
            managers: OrganisationStore.managers,
            creator: OrganisationStore.creator
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

    render() {
        const { members, managers, creator } = this.state;

        return (
            <DashboardLayout>
                <h1>Creator</h1>
                <List>
                     {creator.map((member) => {
                        return <ListItem key={member.id} value={member.name} />;
                    })}
                </List>

                { managers.length > 0 ? <h1>Managers</h1> : null }
                <List>
                     {managers.map((member) => {
                        return <ListItem key={member.id} value={member.name}><Button href="#" text="Remove Manager" /></ListItem>;
                    })}
                </List>


                { members.length > 0 ? <h1>Members</h1> : null }
                <List>
                     {members.map((member) => {
                        return <ListItem key={member.id} value={member.name}><Button href="#" text="Assign Manager" /></ListItem>;
                    })}
                </List>
            </DashboardLayout>
        )
    }

}
