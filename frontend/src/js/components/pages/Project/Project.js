import React, { PropTypes } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import BaseComponent from '../../BaseComponent';
import ProjectActions from '../../../actions/ProjectActions';
import AuthStore from '../../../stores/AuthStore';

export default class Project extends BaseComponent {
    constructor(props) {
        super(props);

        console.log(props);
        console.log(props.params.organisationId);
        console.log(props.params.projectId);
    }

    componentDidMount() {
        var self = this;


    }

    componentWillMount() {
        ProjectActions.getProject(AuthStore.token, this.props.params.organisationId, this.props.params.projectId);
    }

    render() {

        return (
            <DashboardLayout>
            <h1>Projects</h1>
            HELLO WORLD
            </DashboardLayout>
        )
    }

}
