import AppDispatcher from '../dispatchers/AppDispatcher.js';
import * as types from '../constants/ActionTypes';

class BuilderActions {
    static finishDockerfile() {
        AppDispatcher.dispatch({
            actionType: types.BUILDER_FINISH_DOCKERFILE
        });
    }

    static changeDistribution(distribution, distribution_version) {
        AppDispatcher.dispatch({
            actionType: types.BUILDER_DISTRIBUTION_CHANGE,
            distribution: distribution,
            distribution_version: distribution_version
        });
    }

    static nextPage() {
        AppDispatcher.dispatch({
            actionType: types.BUILDER_NEXT_PAGE
        });
    }

    static previousPage() {
        AppDispatcher.dispatch({
            actionType: types.BUILDER_PREVIOUS_PAGE
        });
    }

    static changeMaintainer(maintainer) {
        AppDispatcher.dispatch({
            actionType: types.BUILDER_CHANGE_MAINTAINER,
            maintainer: maintainer
        });
    }

    static changeWorkdir(workdir) {
        AppDispatcher.dispatch({
            actionType: types.BUILDER_CHANGE_WORKDIR,
            workdir: workdir
        });
    }

    static changeUser(user) {
        AppDispatcher.dispatch({
            actionType: types.BUILDER_CHANGE_USER,
            user: user
        });
    }

    static changeLabelItems(items) {
        AppDispatcher.dispatch({
            actionType: types.BUILDER_CHANGE_LABEL_ITEMS,
            items: items
        });
    }

    static changeRunItems(items) {
        AppDispatcher.dispatch({
            actionType: types.BUILDER_CHANGE_RUN_ITEMS,
            items: items
        });
    }

    static changeExposeItems(items) {
        AppDispatcher.dispatch({
            actionType: types.BUILDER_CHANGE_EXPOSE_ITEMS,
            items: items
        });
    }

    static changeVolumeItems(items) {
        AppDispatcher.dispatch({
            actionType: types.BUILDER_CHANGE_VOLUME_ITEMS,
            items: items
        });
    }

    static changeAddItems(items) {
        AppDispatcher.dispatch({
            actionType: types.BUILDER_CHANGE_ADD_ITEMS,
            items: items
        });
    }

    static changeEnvItems(items) {
        AppDispatcher.dispatch({
            actionType: types.BUILDER_CHANGE_ENV_ITEMS,
            items: items
        });
    }

    static changeCmdItems(items) {
        AppDispatcher.dispatch({
            actionType: types.BUILDER_CHANGE_CMD_ITEMS,
            items: items
        });
    }

    static changeDownloadSourceCode(items) {
        AppDispatcher.dispatch({
            actionType: types.BUILDER_CHANGE_SOURCE_CODE_ITEMS,
            items: items
        });
    }
}

export default BuilderActions;
