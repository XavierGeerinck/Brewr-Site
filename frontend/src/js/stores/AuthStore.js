import BaseStore from './BaseStore';
import jwt_decode from 'jwt-decode';
import * as actionTypes from '../constants/ActionTypes';

class AuthStore extends BaseStore {
    constructor() {
        super();

        this.subscribe(() => this._registerToActions.bind(this));
        this._user = null; // Not logged in by default
        this._token = localStorage.getItem('bearer'); // Stored in the JWT var (can be null) so rely on user
    }

    // We get a source back (VIEW or SERVER) with there the action in
    _registerToActions (source) {
        if (!source.action) {
            return;
        }

        switch(source.action.type) {
            case actionTypes.REQUEST_LOGIN:
                console.log('doing request');
                break;
            case actionTypes.RESPONSE_LOGIN:
                localStorage.setItem('bearer', source.action.response.token);
                this._token = source.action.response.token;
                this._user = source.action.response.user;
                this.emitChange();
                break;
            case actionTypes.RESPONSE_REGISTER:
                // The response returns the token and user:
                // { token: "", user: {} } set our store to this
                this._token = source.action.response.token;
                this._user = source.action.response.user;
                this.emitChange();
                break;
            case actionTypes.RESPONSE_USER:
                this._user = source.action.response;
                this.emitChange();
                break;
            case actionTypes.RESPONSE_LOGOUT:
                this._user = null;
                this._token = null;
                localStorage.removeItem('bearer');
                this.emitChange();
                break;
            case actionTypes.RESPONSE_LOGIN_ERROR:
            case actionTypes.RESPONSE_REGISTER_ERROR:
            case actionTypes.RESPONSE_USER_ERROR:
            case actionTypes.RESPONSE_LOGOUT_ERROR:
                console.log('Error! :(');
                console.log(source);
                this.emitChange();
                break;
            default:
                break;
        }
    }

    get user() {
        return this._user;
    }

    get isLoggedIn() {
        return !!this._user;
    }

    get token() {
        return this._token;
    }
}

export default new AuthStore();
