import AppDispatcher from '../dispatchers/AppDispatcher.js';
import * as actionTypes from '../constants/ActionTypes';
import * as ProjectAPIUtils from '../utils/ProjectAPIUtils';

class BuilderActions {
    static saveProject(token, organisationUUID, project) {
        // Dispatch the login event on the view
        AppDispatcher.handleViewAction({
            type: actionTypes.REQUEST_BUILDER_SAVE_PROJECT,
            project: project,
            organisationUUID: organisationUUID
        });

        // login the user
        ProjectAPIUtils.create(token, organisationUUID, project.meta, project.files, project.envInfo);
    }
}

export default BuilderActions;
