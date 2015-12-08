import BaseStore from './BaseStore';
import * as actionTypes from '../constants/ActionTypes';
import ProjectConstants from '../constants/ProjectConstants';


class ProjectStore extends BaseStore {
    constructor() {
        super();

        this.subscribe(() => this._registerToActions.bind(this));
        this._selectedProject = null;
    }

    // We get a source back (VIEW or SERVER) with there the action in
    _registerToActions (source) {
        if (!source.action) {
            return;
        }

        switch(source.action.type) {
            case actionTypes.REQUEST_PROJECT:
                console.log('doing request');
                break;
            case actionTypes.RESPONSE_PROJECT:
                this._selectedProject = source.action.response;
                this.emitChange();
                break;
            case ProjectConstants.PROJECT_ASSIGN_MEMBER:
                this._selectedProject = source.action.response.project;
                this.emitChange();
                break;
            case actionTypes.RESPONSE_PROJECT_ERROR:
                console.log('Error! :(');
                console.log(source);
                window.location = '/#/dashboard';
                break;
            default:
                break;
        }

        return true;
    }

    get selectedProject() {
        return this._selectedProject;
    }
}

export default new ProjectStore();
