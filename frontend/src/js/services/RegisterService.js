/**
 * Created by Maxim on 17/08/2015.
 */
import request from 'reqwest';
import when from 'when';
import {REGISTER_URL} from '../constants/RegisterConstants';
import LoginActions from '../actions/LoginActions.js';


class RegisterService {

    registerUser(email, password) {
        return when(request({
            url: REGISTER_URL,
            method: 'POST',
            crossOrigin: true,
            type: 'json',
            data: {
                email: email,
                password: password
            }
        }))
        .then(function(response){
            var jwt = response.id_token;
            LoginActions.loginUser(jwt);
            return true;
        })
    }

}

export default new RegisterService();