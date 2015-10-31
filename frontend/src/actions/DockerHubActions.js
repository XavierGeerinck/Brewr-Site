import AppDispatcher from '../dispatchers/AppDispatcher.js';
import * as types from '../constants/ActionTypes';

export function setRepositories(repositories) {
    AppDispatcher.dispatch({
        actionType: types.DOCKER_HUB_FETCH_REPOSITORIES,
        repositories: repositories
    });
}
