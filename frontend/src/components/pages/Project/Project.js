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
import Image from '../../elements/Image';
import { Table } from '../../elements/Table';
import Button from '../../elements/Button';


import AssignableMemberList from '../../elements/AssignableMemberList/AssignableMemberList';
import OrganisationStore from '../../../stores/OrganisationStore';
import OrganisationActions from '../../../actions/OrganisationActions';

export class Project extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

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
        if (!this.state || !this.state.selectedProject) {
            return (<div></div>);
        }

        const { selectedProject, currentOrganisation, allMembers } = this.state;

        return (
            <DashboardLayout title={selectedProject.name} className={grid['pure-g']}>
            {/* LEFT */}
            <div className={cx(grid['pure-u-md-4-5'], styles.ContainerLeft)}>
            <div className={styles.ContainerTop}>
            <h1>{selectedProject.name} <Button text="Edit" isForm={true} onClick={this._onClickEditProject.bind(this)}/></h1>
            <p>{selectedProject.description}</p>
            </div>

            {/* BOTTOM */}
            <div className={cx(styles.ContainerBottom, grid['pure-g'])}>
            <div className={grid['pure-u-md-1-2']}>
            <h1>Files</h1>

            <Table className={styles.Table}>
            <tbody>
            <tr>
            <td>test1.txt</td>
            <td>Text File</td>
            <td>Xavier</td>
            </tr>

            <tr>
            <td>test1.txt</td>
            <td>Text File</td>
            <td>Xavier</td>
            </tr>

            <tr>
            <td>test1.txt</td>
            <td>Text File</td>
            <td>Xavier</td>
            </tr>
            </tbody>
            </Table>
            </div>

            <div className={grid['pure-u-md-1-2']}>
            <h1>Revisions</h1>

            <Table className={styles.Table}>
            <tbody>
            <tr>
            <td>d5804063</td>
            <td>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetu...</td>
            <td>Oct 14, 2015</td>
            </tr>

            <tr>
            <td>d5804063</td>
            <td>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetu...</td>
            <td>Oct 14, 2015</td>
            </tr>

            <tr>
            <td>d5804063</td>
            <td>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetu...</td>
            <td>Oct 14, 2015</td>
            </tr>

            <tr>
            <td>d5804063</td>
            <td>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetu...</td>
            <td>Oct 14, 2015</td>
            </tr>
            </tbody>
            </Table>
            </div>
            </div>
            </div>

            {/* RIGHT */}
            <div className={cx(styles.ContainerRight, grid['pure-u-md-1-5'])}>
            <h1>Members</h1>

            <ul>
            {
              selectedProject.members.map(m => {
                return (
                  <li key={"img_" + m.id}>
                    <Image src={m.avatar_url} defaultSrc={require('./avatar.png')}/>
                    <div className={styles.ContainerRightListItem}>
                      <div className={styles.ContainerRightListItemName}>{m.name}</div>
                      <div className={styles.ContainerRightListItemSubtitle}>{m.scope}</div>
                    </div>
                    <button onClick={this._removeMember.bind(this, m.id)}><i className={cx(fa.fa, fa['fa-remove'])}></i></button>
                    <div className={styles.Clear}></div>
                  </li>
                )
              })
            }
            </ul>


          { /* TODO: Only when project manager or owner of organisation */ }
          <h2>Assign Member</h2>
          <AssignableMemberList members={allMembers} project={selectedProject} organisation={currentOrganisation}/>
        </div>
      </DashboardLayout>
    )
  }

}

export default Project;
