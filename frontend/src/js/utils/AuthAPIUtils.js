import * as AuthServerActions from '../actions/AuthServerActions';
import request from 'superagent';

// Todo: Superagent, zie https://github.com/tribou/react-todo/blob/1.1.0/js/utils/RandomUserAPI.js
export function login(email, password) {
    request
    .post('http://localhost:8000/auth/signin')
    .send({
        email: email,
        password: password
    })
    .set('Accept', 'application/json')
    .end(function (err, res) {
        if (err) {
            return AuthServerActions.receiveLoginErrorResponse(err);
        }

        return AuthServerActions.receiveLoginResponse(res.body);
    });
}

export function register(email, password) {
    request
    .post('http://localhost:8000/auth/signup')
    .send({
        email: email,
        password: password
    })
    .end(function (err, res) {
        if (err) {
            return AuthServerActions.receiveRegisterErrorResponse(err);
        }

        return AuthServerActions.receiveRegisterResponse(res.body);
    });
}

export function getUser(token) {
    request
    .get('http://localhost:8000/user')
    .set('Authorization', 'Bearer ' + token)
    .end(function (err, res) {
        if (err) {
            return AuthServerActions.receiveGetUserErrorResponse(err);
        }

        return AuthServerActions.receiveGetUserResponse(res.body);
    })
}

export function logout(token) {
    request
    .get('http://localhost:8000/logout')
    .set('Authorization', 'Bearer ' + token)
    .end(function (err, res) {
        if (err) {
            return AuthServerActions.receiveLogoutErrorResponse(err);
        }

        return AuthServerActions.receiveLogoutResponse(res.body);
    })
}
