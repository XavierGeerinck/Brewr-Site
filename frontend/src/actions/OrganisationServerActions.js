import AppDispatcher from '../dispatchers/AppDispatcher';
import * as actionTypes from '../constants/ActionTypes';
import * as AuthAPIUtils from '../utils/AuthAPIUtils';

// Normal Responses
export function receiveGetOrganisationMembersResponse(response) {
    AppDispatcher.handleServerAction({
        type: actionTypes.RESPONSE_ORGANISATION_MEMBERS,
        response: response
    });
}

export function receiveGetOrganisationMembersErrorResponse(err) {
    AppDispatcher.handleServerAction({
        type: actionTypes.RESPONSE_ORGANISATION_MEMBERS_ERROR,
        error: err
    });
}
