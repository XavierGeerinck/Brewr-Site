import AppDispatcher from '../dispatchers/AppDispatcher';
import * as actionTypes from '../constants/ActionTypes';
import * as ProjectConstants from '../constants/ProjectConstants';

// Normal Responses
export function receiveProjectResponse(response) {
    AppDispatcher.handleServerAction({
        type: actionTypes.RESPONSE_PROJECT,
        response: response
    });
}

export function receiveProjectImageResponse(response) {
    AppDispatcher.handleServerAction({
        type: actionTypes.RESPONSE_PROJECT_IMAGE,
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

export function assignMemberResponse(response) {
    AppDispatcher.handleServerAction({
        type: ProjectConstants.PROJECT_ASSIGN_MEMBER,
        response: response
    });
}
