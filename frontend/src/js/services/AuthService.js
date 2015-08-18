/**
 * Created by Maxim on 15/08/2015.
 */
import request from 'reqwest';
import when from 'when';
import {LOGIN_URL, SIGNUP_URL} from '../constants/LoginConstants';
import LoginActions from '../actions/LoginActions';

class AuthService {
    login(username, password) {

        return this.handleAuth(when(request({
            url: LOGIN_URL,
            method: 'POST',
            crossOrigin: true,
            type: 'json',
            data: {
                email: username,
                password: password
            }
        })));
    }

    logout() {
        LoginActions.logoutUser();
    }

    handleAuth(loginPromise) {
        return loginPromise
            .then(function(response){
                var jwt = response.id_token;
                LoginActions.loginUser(jwt);
                return true;
            })
    }
}

export default new AuthService()