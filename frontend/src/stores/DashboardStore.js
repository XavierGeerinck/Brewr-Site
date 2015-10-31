import BaseStore from './BaseStore';
import * as actionTypes from '../constants/ActionTypes';

class DashboardStore extends BaseStore {
    constructor() {
        super();

        this.subscribe(() => this._registerToActions.bind(this));
    }

    _registerToActions(source) {
        if (!source.action) {
            return;
        }

        switch (source.action.type) {
            
        }
    }
}

export default new DashboardStore();
