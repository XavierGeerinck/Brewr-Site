import BaseStore from './BaseStore';
import * as types from '../constants/ActionTypes';

export default class DockerHubStore extends BaseStore {
    constructor () {
        super();

        this._repositories = [];
    }

    _registerToActions(action) {
        case types.DOCKER_HUB_FETCH_REPOSITORIES:
            this._repositories = action.repositories;
        default:
            break;
    }
}
