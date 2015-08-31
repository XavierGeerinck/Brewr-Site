/**
 * Created by Maxim on 30/08/2015.
 */
import React, { PropTypes } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import BaseComponent from '../../BaseComponent';

export default class Team extends BaseComponent {

    render() {
        var teams = [];
        teams.push({name: "Developers", description: "Description of a team within the organization"});

        return (
            <DashboardLayout>
                <h1>Teams</h1>
                <ul>
                     {teams.map((team) => {
                        return <li key={team.name}>{team.name}</li>;
                    })}
                </ul>
            </DashboardLayout>
        )
    }

}