import BaseStore from './BaseStore';
import * as actionTypes from '../constants/ActionTypes';


class ProjectEditImageStore extends BaseStore {
    constructor() {
        super();

        this.subscribe(() => this._registerToActions.bind(this));
        this._image = null;
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
            case actionTypes.RESPONSE_PROJECT_IMAGE:
				this._image = source.action.response;
				console.log(this._image);
				this.emitChange();
                break;
            default:
                break;
        }

      this.emitChange();
      return true;
    }

    get image() {
        return this._image;
    }
}

export default new ProjectEditImageStore();
