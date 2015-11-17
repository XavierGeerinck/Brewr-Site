import AppDispatcher from '../dispatchers/AppDispatcher';
import ProjectConstants from '../constants/ProjectConstants';
import * as ProjectAPIUtils from '../utils/ProjectAPIUtils';
import * as actionTypes from '../constants/ActionTypes';
import AuthStore from '../stores/AuthStore';

var ProjectActions = {
    getProject: function(token, organisationId, projectId) {
        AppDispatcher.handleViewAction({
            type: actionTypes.REQUEST_PROJECT,
            name: organisationId,
            projectId: projectId
        });

        ProjectAPIUtils.getProject(token, organisationId, projectId);
    },
    assignMember: function(organisationId, projectId, memberId) {
      AppDispatcher.handleViewAction({
        type: actionTypes.REQUEST_PROJECT,
        projectId: projectId,
        memberId: memberId
      });

      ProjectAPIUtils.assignMember(AuthStore.token, organisationId, projectId, memberId);
    },
    removeMember: function(organisationId, projectId, memberId) {
      AppDispatcher.handleViewAction({
        type: actionTypes.REQUEST_PROJECT,
        projectId: projectId,
        memberId: memberId
      });

      ProjectAPIUtils.removeMember(AuthStore.token, organisationId, projectId, memberId);
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
};

export default ProjectActions;
