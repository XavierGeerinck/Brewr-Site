import React, { PropTypes } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import BaseComponent from '../../BaseComponent';
import ProjectActions from '../../../actions/ProjectActions';
import AuthStore from '../../../stores/AuthStore';
import ProjectStore from '../../../stores/ProjectStore';

export class Project extends BaseComponent {
    constructor(props) {
        super(props);
        this._getState();
    }

    componentDidMount() {
        this.changeListener = this._onChange.bind(this);
        ProjectStore.addChangeListener(this.changeListener);
        ProjectActions.getProject(AuthStore.token, this.props.params.organisationId, this.props.params.projectId);
    }

    componentWillUnmount() {
        ProjectStore.removeChangeListener(this.changeListener);
    }

    componentWillMount() {
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

        console.log(selectedProject);

        return (
            <DashboardLayout title={selectedProject.name}>
                <div>
                    <h1>{selectedProject.name}</h1>
                    <p>{selectedProject.description}</p>
                </div>

                <h1>Members</h1>
                {
                    selectedProject.members.map(m => {
                        <li><img src={m.avatar_url} />{m.name} - {m.scope}</li>
                    })
                }

            </DashboardLayout>
        )
    }

}

export default Project;
