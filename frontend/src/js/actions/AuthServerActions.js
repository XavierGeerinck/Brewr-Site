import AppDispatcher from '../dispatchers/AppDispatcher';
import * as actionTypes from '../constants/ActionTypes';

export function receiveLoginResponse(response) {
    AppDispatcher.handleServerAction({
        type: actionTypes.RESPONSE_LOGIN,
        response: response
    });
}
