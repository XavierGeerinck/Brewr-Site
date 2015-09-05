import BaseStore from './BaseStore';
import * as types from '../constants/ActionTypes';

class BuilderStore extends BaseStore {
    constructor () {
        super();

        this.subscribe(() => this._registerToActions.bind(this));

        this._dockerfile = {
            distribution: null, // FROM (base)
            distribution_version: null, // FROM (version)
            instructions: {
                maintainer: null, // The MAINTAINER instruction allows you to set the Author field of the generated images.
                label: [], // The LABEL instruction adds metadata to an image. A LABEL is a key-value pair. (LABEL <key>=<value> <key>=<value> <key>=<value>)
                workdir: null, // The WORKDIR instruction sets the working directory
                user: null, // The USER instruction sets the user name or UID to use when running the image

                // TODO
                cmd: null,
                run: null,
                expose: null,
                env: null,
                add: null,
                copy: null,
                entrypoint: null,
                volume: null,
                onbuild: null
            }
        };

        this._hubSearchTerm = '';
        this._currentStep = 1;
        this._numberOfSteps = 9;
    }

    _registerToActions(action) {
        switch (action.actionType) {
            case types.BUILDER_DISTRIBUTION_CHANGE:
                this._dockerfile.distribution = action.distribution;
                this._dockerfile.distribution_version = action.distribution_version;
                this.emitChange();
                break;
            case types.BUILDER_NEXT_PAGE:
                this._currentStep = (this._currentStep + 1) % (this._numberOfSteps + 1);
                this.emitChange();
                break;
        }
    }

    get dockerfile() {
        return this._dockerfile;
    }

    get currentStep() {
        return this._currentStep;
    }
}

export default new BuilderStore();
