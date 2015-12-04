import AppDispatcher from '../dispatchers/AppDispatcher';
import ProjectConstants from '../constants/ProjectConstants';
import * as ProjectAPIUtils from '../utils/ProjectAPIUtils';
import * as actionTypes from '../constants/ActionTypes';
import AuthStore from '../stores/AuthStore';

// import AppDispatcher from '../dispatchers/AppDispatcher.js';
// import * as actionTypes from '../constants/ActionTypes';
// import * as ProjectAPIUtils from '../utils/ProjectAPIUtils';

class ProjectActions {
    static getProject(token, organisationUUID, projectId) {
        AppDispatcher.handleViewAction({
            type: actionTypes.REQUEST_PROJECT,
            name: organisationUUID,
            projectId: projectId
        });

        ProjectAPIUtils.getProject(token, organisationUUID, projectId);
    }

    static assignMember(organisationUUID, projectId, memberId) {
        AppDispatcher.handleViewAction({
            type: actionTypes.REQUEST_PROJECT,
            projectId: projectId,
            memberId: memberId
        });

        ProjectAPIUtils.assignMember(AuthStore.token, organisationUUID, projectId, memberId);
    }

    static removeMember(organisationUUID, projectId, memberId) {
        AppDispatcher.handleViewAction({
            type: actionTypes.REQUEST_PROJECT,
            projectId: projectId,
            memberId: memberId
        });

        ProjectAPIUtils.removeMember(AuthStore.token, organisationUUID, projectId, memberId);
    }

    static editProjectImage(token, organisationUUID, projectId, revisionUUID) {
        AppDispatcher.handleViewAction({
            type: actionTypes.REQUEST_PROJECT_IMAGE,
            name: organisationUUID,
            projectId: projectId,
            revisionUUID: revisionUUID
        });

        ProjectAPIUtils.getProjectImage(token, organisationUUID, projectId, revisionUUID);
    }


    //
    // create: function(project) {
    //     AppDispatcher.dispatch({
    //         actionType: ProjectConstants.PROJECT_CREATE,
    //         project: project
    //     });
    // },
    //
    // update: function(id, project) {
    //     AppDispatcher.dispatch({
    //         actionType: ProjectConstants.PROJECT_UPDATE,
    //         id: id,
    //         project: project
    //     })
    // },
    //
    // destroy: function() {
    //     AppDispatcher.dispatch({
    //         actionType: ProjectConstants.PROJECT_DESTROY,
    //         id: id
    //     })
    // }
}

export default ProjectActions;
