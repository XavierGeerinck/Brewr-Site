import Constants from '../Constants';
import {EventEmitter} from 'events';
import AppDispatcher from '../dispatchers/AppDispatcher';

export default class BaseStore extends EventEmitter {
    constructor() {
        super();
    }

    addChangeListener(callback) {
        this.on(Constants.CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(Constants.CHANGE_EVENT, callback);
    }

    // triggers change listener above, firing controller-view callback
    emitChange() {
        this.emit(Constants.CHANGE_EVENT);
    }

    subscribe(actionSubscribe) {
        this._dispatchToken = AppDispatcher.register(actionSubscribe());
    }

    get dispatchToken() {
        return this._dispatchToken;
    }
}
