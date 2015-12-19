import styles from './Project.scss';
import fa from 'font-awesome/css/font-awesome.css';
import purecss from 'purecss/build/pure.css';
import grid from 'purecss/build/grids-responsive.css';

import React, { PropTypes } from 'react';
import cx from 'classnames';
import DashboardLayout from '../../layouts/DashboardLayout';
import BaseComponent from '../../BaseComponent';
import ProjectActions from '../../../actions/ProjectActions';
import AuthStore from '../../../stores/AuthStore';
import ProjectStore from '../../../stores/ProjectStore';
import { Table } from '../../elements/Table';
import Button from '../../elements/Button';


import AssignableMemberList from '../../elements/AssignableMemberList/AssignableMemberList';
import OrganisationStore from '../../../stores/OrganisationStore';
import OrganisationActions from '../../../actions/OrganisationActions';

import ProjectRevisionTable from '../../elements/ProjectRevisionTable/ProjectRevisionTable';
import ProjectFileTable from '../../elements/ProjectFileTable/ProjectFileTable';
import MemberList from '../../elements/MemberList/MemberList';

export class Project extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = this._getState();
        this._bind('_onChange');
    }

    componentDidMount() {
        this.changeListener = this._onChange.bind(this);
        ProjectStore.addChangeListener(this.changeListener);
        OrganisationStore.addChangeListener(this.changeListener);

        ProjectActions.getProject(AuthStore.token, this.props.params.organisationUUID, this.props.params.projectId);
        OrganisationActions.getMembers(AuthStore.token, this.props.params.organisationUUID);
    }

    componentWillUnmount() {
        ProjectStore.removeChangeListener(this.changeListener);
        OrganisationStore.removeChangeListener(this.changeListener);
    }

    _getState() {
        return {
            selectedProject: ProjectStore.selectedProject,
            allMembers: OrganisationStore.allMembers,
            filteredMembers: OrganisationStore.allMembers
        }
    }

    _onChange() {
        var state = this._getState();
        this.setState(state);
    }

    _removeMember(id) {
        ProjectActions.removeMember(this.props.params.organisationUUID, this.state.selectedProject.id, id);
    }

    _onClickEditProject() {
        var organisationUUID = this.props.params.organisationUUID;
        var revisionUUID = this.state.selectedProject.revisions[0].revision_number;
        var projectId = this.state.selectedProject.id;

        this.props.history.pushState(null, '/organisation/' + organisationUUID + '/project/' + projectId + '/image/' + revisionUUID + '/edit');
    }

    render() {
        const { selectedProject, currentOrganisation, allMembers } = this.state;

        if (!selectedProject) {
            return (<div></div>);
        }

        return (
            <DashboardLayout title={selectedProject.name} className={grid['pure-g']}>
                {/* LEFT */}
                <div className={cx(grid['pure-u-md-4-5'], styles.ContainerLeft)}>
                    <div className={styles.ContainerTop}>
                        <h1>{selectedProject.name} <Button text="Edit" isForm={true} onClick={this._onClickEditProject.bind(this)}/>
                    </h1>
                    <p>{selectedProject.description}</p>
                </div>

                {/* BOTTOM */}
                <div className={cx(styles.ContainerBottom, grid['pure-g'])}>
                    <div className={grid['pure-u-md-1-2']}>
                        <h1>Files</h1>
                        <ProjectFileTable files={[]}/>
                    </div>

                    <div className={grid['pure-u-md-1-2']}>
                        <h1>Revisions</h1>
                        <ProjectRevisionTable revisions={selectedProject.revisions}/>
                    </div>
                </div>
            </div>

            {/* RIGHT */}
            <div className={cx(styles.project_sidebar, grid['pure-u-md-1-5'])}>
                <h2>Members</h2>
                <MemberList members={selectedProject.members} project={selectedProject} organisation={currentOrganisation}/>

                { /* TODO: Only when project manager or owner of organisation */ }
                <h2>Assign Member</h2>
                <AssignableMemberList members={allMembers} project={selectedProject} organisation={currentOrganisation}/>
            </div>
        </DashboardLayout>
    )
}

}

export default Project;
