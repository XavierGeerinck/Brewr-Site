/**
 * Created by Maxim on 15/08/2015.
 */
import AppDispatcher from '../Dispatcher.js';
import {LOGIN_USER, LOGOUT_USER} from '../constants/LoginConstants.js';
import RouterContainer from '../services/RouterContainer.js';

export default {
    loginUser: (jwt) => {
        var savedJwt = localStorage.getItem('jwt');

        if(savedJwt !== jwt) {
            var nextPath = RouterContainer.get().getCurrentQuery().nextPath || '/';

            RouterContainer.get().transitionTo(nextPath);
            localStorage.setItem('jwt', jwt);
        }

        AppDispatcher.dispatch({
            actionType: LOGIN_USER,
            jwt: jwt
        });
    },

    logoutUser: () => {
        RouterContainer.get().transitionTo('/login');
        localStorage.removeItem('jwt');
        AppDispatcher.dispatch({
            actionType: LOGOUT_USER
        });
    }
}