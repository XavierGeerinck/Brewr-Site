import * as AuthServerActions from '../actions/AuthServerActions';
import request from 'superagent';

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

export function register(email, password, firstName, lastName) {
    request
    .post('http://localhost:8000/auth/signup')
    .send({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
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
    .get('http://localhost:8000/auth/logout')
    .set('Authorization', 'Bearer ' + token)
    .end(function (err, res) {
        if (err) {
            return AuthServerActions.receiveLogoutErrorResponse(err);
        }

        return AuthServerActions.receiveLogoutResponse(res.body);
    })
}
