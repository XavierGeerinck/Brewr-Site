import React, { PropTypes } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import BaseComponent from '../../BaseComponent';
import ProjectActions from '../../../actions/ProjectActions';
import AuthStore from '../../../stores/AuthStore';
import ProjectStore from '../../../stores/ProjectStore';

export default class Project extends BaseComponent {
    constructor(props) {
        super(props);

        this._getState();
    }

    componentDidMount() {
        this.changeListener = this._onChange.bind(this);
        ProjectStore.addChangeListener(this.changeListener);
    }

    componentWillUnmount() {
        ProjectStore.removeChangeListener(this.changeListener);
    }

    componentWillMount() {
        ProjectActions.getProject(AuthStore.token, this.props.params.organisationId, this.props.params.projectId);
    }

    _getState() {
        return {
            selectedProject: ProjectStore.selectedProject
        }
    }

    _onChange() {
        this.setState(this._getState());
    }

    render() {
        if (!this.state || !this.state.selectedProject) {
            return (<div></div>);
        }

        const { selectedProject } = this.state;

        return (
            <DashboardLayout>
                <h1>{selectedProject.name}</h1>
                {selectedProject.description}
            </DashboardLayout>
        )
    }

}
