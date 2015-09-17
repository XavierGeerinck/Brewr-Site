import * as AuthServerActions from '../actions/AuthServerActions';

// Todo: Superagent, zie https://github.com/tribou/react-todo/blob/1.1.0/js/utils/RandomUserAPI.js
export function login(email, password) {
    // AJAX CALL
    let response = { success: true, token: 'somerandomtokenhereseeserverresponse' };

    setTimeout(function() {
        AuthServerActions.receiveLoginResponse(response);
    }, 500);
}
