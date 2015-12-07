import AppDispatcher from '../dispatchers/AppDispatcher';
import ProjectConstants from '../constants/ProjectConstants';
import * as ProjectAPIUtils from '../utils/ProjectAPIUtils';
import * as actionTypes from '../constants/ActionTypes';
import AuthStore from '../stores/AuthStore';

class ProjectActions {
  static getProject(token, organisationId, projectId) {
    AppDispatcher.handleViewAction({
      type: actionTypes.REQUEST_PROJECT,
      name: organisationId,
      projectId: projectId
    });

    ProjectAPIUtils.getProject(token, organisationId, projectId);
  }

  static assignMember(organisationId, projectId, memberId) {
    AppDispatcher.handleViewAction({
      type: actionTypes.REQUEST_PROJECT,
      projectId: projectId,
      memberId: memberId
    });

    ProjectAPIUtils.assignMember(AuthStore.token, organisationId, projectId, memberId);
  }

  static removeMember(organisationId, projectId, memberId) {
    AppDispatcher.handleViewAction({
      type: actionTypes.REQUEST_PROJECT,
      projectId: projectId,
      memberId: memberId
    });

    ProjectAPIUtils.removeMember(AuthStore.token, organisationId, projectId, memberId);
  }

  static promoteToManager(organisationId, projectId, memberId) {
    AppDispatcher.handleViewAction({
      type: actionTypes.REQUEST_PROJECT,
      projectId: projectId,
      memberId: memberId
    });

    ProjectAPIUtils.promoteToManager(AuthStore.token, organisationId, projectId, memberId);
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

}

export default ProjectActions;
