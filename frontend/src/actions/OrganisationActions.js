import AppDispatcher from '../dispatchers/AppDispatcher';
import ProjectConstants from '../constants/ProjectConstants';
import * as OrganisationAPIUtils from '../utils/OrganisationAPIUtils';
import * as actionTypes from '../constants/ActionTypes';

var ProjectActions = {
    getMembers: function(token, organisationUUID) {
        // For some reason when dispatching here we get already dispatching in the middle of a dispatch
        // AppDispatcher.handleViewAction({
        //     type: actionTypes.REQUEST_ORGANISATION_MEMBERS,
        //     uuid: organisationUUID
        // });

        OrganisationAPIUtils.getOrganisationMembers(token, organisationUUID);
    },
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
