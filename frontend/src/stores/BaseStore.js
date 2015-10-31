import {EventEmitter} from 'events';
import AppDispatcher from '../dispatchers/AppDispatcher';
var CHANGE_EVENT = "CHANGE_EVENT";

export default class BaseStore extends EventEmitter {
    constructor() {
        super();
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    // triggers change listener above, firing controller-view callback
    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    subscribe(actionSubscribe) {
        this._dispatchToken = AppDispatcher.register(actionSubscribe());
    }

    get dispatchToken() {
        return this._dispatchToken;
    }
}
