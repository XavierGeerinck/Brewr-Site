import AppDispatcher from '../dispatchers/AppDispatcher';
import * as actionTypes from '../constants/ActionTypes';
import * as AuthAPIUtils from '../utils/AuthAPIUtils';

// Normal Responses
export function receiveLoginResponse(response) {
    AppDispatcher.handleServerAction({
        type: actionTypes.RESPONSE_LOGIN,
        response: response
    });

    // Send the getUser to here (remember, this is an action creator!)
    AuthAPIUtils.getUser(response.token);
}

export function receiveRegisterResponse(response) {
    AppDispatcher.handleServerAction({
        type: actionTypes.RESPONSE_REGISTER,
        response: response
    });
}

export function receiveGetUserResponse(response) {
    AppDispatcher.handleServerAction({
        type: actionTypes.RESPONSE_USER,
        response: response
    });
}

export function receiveLogoutResponse(response) {
    AppDispatcher.handleServerAction({
        type: actionTypes.RESPONSE_LOGOUT,
        response: response
    });
}

// Errors
export function receiveLoginErrorResponse(err) {
    AppDispatcher.handleServerAction({
        type: actionTypes.RESPONSE_LOGIN_ERROR,
        error: err
    });
}

export function receiveRegisterErrorResponse(err) {
    AppDispatcher.handleServerAction({
        type: actionTypes.RESPONSE_REGISTER_ERROR,
        error: err
    });
}

export function receiveGetUserErrorResponse(err) {
    AppDispatcher.handleServerAction({
        type: actionTypes.RESPONSE_USER_ERROR,
        error: err
    });
}

export function receiveLogoutErrorResponse(err) {
    AppDispatcher.handleServerAction({
        type: actionTypes.RESPONSE_LOGOUT_ERROR,
        error: err
    });
}
