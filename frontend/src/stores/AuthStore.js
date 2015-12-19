import BaseStore from './BaseStore';
import jwt_decode from 'jwt-decode';
import * as actionTypes from '../constants/ActionTypes';

class AuthStore extends BaseStore {
    constructor() {
        super();

        this.subscribe(() => this._registerToActions.bind(this));
        this._user = null; // Not logged in by default
        this._organisations = []; // Organisations a user belongs to
        this._selected_organisation = null;
        this._token = localStorage.getItem('bearer'); // Stored in the JWT var (can be null) so rely on user
    }

    // We get a source back (VIEW or SERVER) with there the action in
    _registerToActions (source) {
        if (!source.action) {
            return;
        }

        switch(source.action.type) {
            case actionTypes.REQUEST_LOGIN:
                break;
            case actionTypes.RESPONSE_LOGIN:
                localStorage.setItem('bearer', source.action.response.token);
                this._token = source.action.response.token;
                this.emitChange();
                break;
            case actionTypes.RESPONSE_REGISTER:
                // The response returns the token and user:
                // { token: "", user: {} } set our store to this
                localStorage.setItem('bearer', source.action.response.token);
                this._token = source.action.response.token;
                this.emitChange();
                break;
            case actionTypes.RESPONSE_USER:
                this._user = source.action.response.user;
                this._organisations = source.action.response.user.organisations;
                this._selected_organisation = source.action.response.user.organisations[0] || [];
                this.emitChange();
                break;
            case actionTypes.RESPONSE_LOGOUT:
                this._user = null;
                this._token = null;
                localStorage.removeItem('bearer');
                this.emitChange();
                break;
            case actionTypes.CHANGE_SELECTED_COMPANY:
                this._selected_organisation = this._organisations.filter(o => {
                    return o.name === source.action.name
                })[0];

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

        return true;
    }

    get user() {
        return this._user;
    }

    get organisations() {
        return this._organisations;
    }

    get selected_organisation() {
        return this._selected_organisation;
    }

    get isLoggedIn() {
        return !!this._user;
    }

    get token() {
        return this._token;
    }
}

export default new AuthStore();
