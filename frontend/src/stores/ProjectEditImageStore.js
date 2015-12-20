import BaseStore from './BaseStore';
import * as actionTypes from '../constants/ActionTypes';


class ProjectEditImageStore extends BaseStore {
    constructor() {
        super();

        this.subscribe(() => this._registerToActions.bind(this));
        this._image = { project: {}, projectEnvInfo: {}, projectFiles: [] };
    }

    // We get a source back (VIEW or SERVER) with there the action in
    _registerToActions (source) {
        if (!source.action) {
            return;
        }

        switch(source.action.type) {
            case actionTypes.REQUEST_PROJECT:
                break;
            case actionTypes.RESPONSE_PROJECT_IMAGE:
                this._image.project = source.action.response.project;
				this._image.projectEnvInfo = source.action.response.projectEnvInfo;
                this._image.projectFiles = source.action.response.projectFiles;
				this.emitChange();
                break;
            default:
                break;
        }
    }

    get image() {
        return this._image;
    }
}

export default new ProjectEditImageStore();
