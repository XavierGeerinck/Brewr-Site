import BaseStore from './BaseStore';
import * as types from '../constants/ActionTypes';

class BuilderStore extends BaseStore {
    constructor() {
        super();

        // this.state = {
        //     config: {
        //         distribution: null, // FROM (base)
        //         distribution_version: null, // FROM (version)
        //         instructions: {
        //             maintainer: null, // The MAINTAINER instruction allows you to set the Author field of the generated images.
        //             label: [], // The LABEL instruction adds metadata to an image. A LABEL is a key-value pair. (LABEL <key>=<value> <key>=<value> <key>=<value>)
        //             workdir: null, // The WORKDIR instruction sets the working directory
        //             user: null, // The USER instruction sets the user name or UID to use when running the image
        //
        //             // TODO
        //             cmd: null,
        //             run: null,
        //             expose: null,
        //             env: null,
        //             add: null,
        //             copy: null,
        //             entrypoint: null,
        //             volume: null,
        //             onbuild: null
        //         },
        //     },
        //     hub_search: '',
        //     step: 1,
        //     steps: 9
        // };
    }

    _registerToActions(action) {

    }

    // getState() {
    //     return this.state;
    // }
    //
    // getStep() {
    //     return this.state.step;
    // }
}

export default new BuilderStore();
