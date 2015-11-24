import AppDispatcher from '../dispatchers/AppDispatcher.js';
import * as actionTypes from '../constants/ActionTypes';
import * as ProjectAPIUtils from '../utils/ProjectAPIUtils';

class BuilderActions {
    static saveProject(token, organisationId, project) {
        // Dispatch the login event on the view
        AppDispatcher.handleViewAction({
            type: actionTypes.REQUEST_BUILDER_SAVE_PROJECT,
            project: project,
            organisationId: organisationId
        });

        // login the user
        ProjectAPIUtils.create(token, organisationId, project.meta, project.files, project.envInfo);
    }

    static changeDistribution(distribution, distribution_version) {
        AppDispatcher.dispatch({
            actionType: actionTypes.BUILDER_DISTRIBUTION_CHANGE,
            distribution: distribution,
            distribution_version: distribution_version
        });
    }

    static setProjectName(projectName) {
        AppDispatcher.dispatch({
            actionType: actionTypes.BUILDER_PROJECT_NAME_CHANGE,
            projectName: projectName
        });
    }

    static nextPage() {
        AppDispatcher.dispatch({
            actionType: actionTypes.BUILDER_NEXT_PAGE
        });
    }

    static previousPage() {
        AppDispatcher.dispatch({
            actionType: actionTypes.BUILDER_PREVIOUS_PAGE
        });
    }

    static changeMaintainer(maintainer) {
        AppDispatcher.dispatch({
            actionType: actionTypes.BUILDER_CHANGE_MAINTAINER,
            maintainer: maintainer
        });
    }

    static changeWorkdir(workdir) {
        AppDispatcher.dispatch({
            actionType: actionTypes.BUILDER_CHANGE_WORKDIR,
            workdir: workdir
        });
    }

    static changeUser(user) {
        AppDispatcher.dispatch({
            actionType: actionTypes.BUILDER_CHANGE_USER,
            user: user
        });
    }

    static changeLabelItems(items) {
        AppDispatcher.dispatch({
            actionType: actionTypes.BUILDER_CHANGE_LABEL_ITEMS,
            items: items
        });
    }

    static changeRunItems(items) {
        AppDispatcher.dispatch({
            actionType: actionTypes.BUILDER_CHANGE_RUN_ITEMS,
            items: items
        });
    }

    static changeExposeItems(items) {
        AppDispatcher.dispatch({
            actionType: actionTypes.BUILDER_CHANGE_EXPOSE_ITEMS,
            items: items
        });
    }

    static changeVolumeItems(items) {
        AppDispatcher.dispatch({
            actionType: actionTypes.BUILDER_CHANGE_VOLUME_ITEMS,
            items: items
        });
    }

    static changeAddItems(items) {
        AppDispatcher.dispatch({
            actionType: actionTypes.BUILDER_CHANGE_ADD_ITEMS,
            items: items
        });
    }

    static changeEnvItems(items) {
        AppDispatcher.dispatch({
            actionType: actionTypes.BUILDER_CHANGE_ENV_ITEMS,
            items: items
        });
    }

    static changeCmdItems(items) {
        AppDispatcher.dispatch({
            actionType: actionTypes.BUILDER_CHANGE_CMD_ITEMS,
            items: items
        });
    }

    static changeDownloadSourceCode(items) {
        AppDispatcher.dispatch({
            actionType: actionTypes.BUILDER_CHANGE_SOURCE_CODE_ITEMS,
            items: items
        });
    }
}

export default BuilderActions;
