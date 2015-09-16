import BaseStore from './BaseStore';
import jwt_decode from 'jwt-decode';
import * as actionTypes from '../constants/ActionTypes';

class AuthStore extends BaseStore {
    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this));
    }

    _registerToActions(action) {
        switch(action.action.type) {
            case actionTypes.REQUEST_LOGIN:
                console.log('doing request');
                break;
            case actionTypes.RESPONSE_LOGIN:
                console.log('GOT RESPONSE :O');
                console.log(action);
                this.emitChange();
                break;
            default:
                break;
        }
    }
}

export default new AuthStore();
