import request from 'reqwest';
import when from 'when';
import {REGISTER_URL} from '../constants/RegisterConstants';
import LoginActions from '../actions/LoginActions.js';


class RegisterService {

    registerUser(email, password) {

        var promise = request({
            url: REGISTER_URL,
            method: 'POST',
            crossOrigin: true,
            type: 'json',
            data: {
                email: email,
                password: password
            }
        });

        promise
            .then(function(response){
                var jwt = response.id_token;
                LoginActions.loginUser(jwt);
                return true;
            });

        return promise;
    }

}

export default new RegisterService();
