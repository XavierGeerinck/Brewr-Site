import AppDispatcher from '../dispatchers/AppDispatcher';
import * as actionTypes from '../constants/ActionTypes';
import * as ProjectAPIUtils from '../utils/ProjectAPIUtils';

// Normal Responses
export function receiveProjectResponse(response) {
    AppDispatcher.handleServerAction({
        type: actionTypes.RESPONSE_PROJECT,
        response: response
    });
}

// Errors
export function receiveProjectErrorResponse(err) {
    AppDispatcher.handleServerAction({
        type: actionTypes.RESPONSE_PROJECT_ERROR,
        error: err
    });
}
