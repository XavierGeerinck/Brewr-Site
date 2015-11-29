import BaseStore from './BaseStore';
import * as types from '../constants/ActionTypes';

class BuilderStore extends BaseStore {
    constructor () {
        super();

        this.subscribe(() => this._registerToActions.bind(this));

        // this._params = {
        //     distribution: null, // FROM (base)
        //     distribution_version: null, // FROM (version)
        //     envInfo: {
        //         maintainer: null, // The MAINTAINER instruction allows you to set the Author field of the generated images.
        //         label: [], // The LABEL instruction adds metadata to an image. A LABEL is a key-value pair. (LABEL <key>=<value> <key>=<value> <key>=<value>)
        //         workdir: null, // The WORKDIR instruction sets the working directory
        //         user: null, // The USER instruction sets the user name or UID to use when running the image
        //
        //         // TODO
        //         cmd: null,
        //         source_code: null, // This is separate to make it easier to create a dockerfile
        //         run: null,
        //         expose: null,
        //         env: null,
        //         add: null,
        //         copy: null,
        //         entrypoint: null,
        //         volume: null,
        //         onbuild: null
        //     }
        // };

        this._builderSteps = [ "Distribution Picker", "Install Programs", "Manage Files & Src", "Startup Commands", "Ports & Env", "Finalize" ];
        this._featuredDistributions = [
            {
                "distribution": "ubuntu",
                "logo_url": "http://summit.ubuntu.com/media/images/cof_orange_hex1.png",
                "versions": [{
                    "name": "v15.04 - Vilvid Vervet",
                    "value": "15.04"
                },
                {
                    "name": "v14.10 - Utopic Unicorn",
                    "value": "14.10"
                },
                {
                    "name": "v14.04 - LTS Trusty Tahr",
                    "value": "14.04"
                },
                {
                    "name": "v13.10 Saucy Salamander",
                    "value": "13.10"
                }]
            },
            {
                "distribution": "fedora",
                "logo_url": "http://summit.ubuntu.com/media/images/cof_orange_hex1.png",
                "versions": [{
                    name: "v15.04 - Vilvid Vervet",
                    value: "15.04"
                }]
            },
            {
                "distribution": "coreos",
                "logo_url": "http://summit.ubuntu.com/media/images/cof_orange_hex1.png",
                "versions": [{
                    name: "v15.04 - Vilvid Vervet",
                    value: "15.04"
                }]
            },
            {
                "distribution": "mint",
                "logo_url": "http://summit.ubuntu.com/media/images/cof_orange_hex1.png",
                "versions": [{
                    name: "v15.04 - Vilvid Vervet",
                    value: "15.04"
                }]
            }
        ];

        this._params = {
            meta: {
                name: "Nginx",       // Project Name
                description: ""             // Project Description
            },
            files: [],                      // Files to add, format: { name: "", content: "" }
            envInfo: {
                "distribution": "ubuntu",
                "distributionVersion": "14.04",
                "maintainer": "Xavier",
                "label": [
                    "com.brewr.io=somevalue",
                ],
                "workdir": "/var/www",
                "user": "www-data",
                "run": [
                    "sudo apt-get install nginx"
                ],
                "sourceCode": null,
                "cmd": [
                    "nginx -g daemon off;"
                ],
                "expose": [
                    "80:80",
                    "443:443"
                ],
                "env": [
                    "ENVIRONMENT=staging"
                ],
                "add": [
                    "/etc/nginx/sites-available/default.conf:/nginx_default.conf.bak",
                ],
                "copy": null,
                "entrypoint": null,
                "volume": [
                    "/var/www"
                ],
                "onbuild": null
            }
        };

        this._hubSearchTerm = '';
        this._currentStep = 2;
        this._numberOfSteps = 6;
    }

    _registerToActions(action) {
        switch (action.action.type) {
            case types.BUILDER_DISTRIBUTION_CHANGE:
            this._params.distribution = action.distribution;
            this._params.distributionVersion = action.distribution_version;
            this.emitChange();
            break;
            case types.BUILDER_NEXT_PAGE:
            if ((this._currentStep + 1) <= this._numberOfSteps) {
                this._currentStep++;
            }

            this.emitChange();
            break;
            case types.BUILDER_PREVIOUS_PAGE:
            if (this._currentStep > 1) {
                this._currentStep--;
            } else {
                this._currentStep = 1;
            }

            this.emitChange();
            break;
            case types.RESPONSE_PROJECT_IMAGE:
            this._params.meta = {};
            this._params.envInfo = action.action.response || {};
            this._params.files = [];
            this.emitChange();
            break;
            case types.BUILDER_CHANGE_MAINTAINER:
            this._params.envInfo.maintainer = action.maintainer;
            this.emitChange();
            break;
            case types.BUILDER_CHANGE_WORKDIR:
            this._params.envInfo.workdir = action.workdir;
            this.emitChange();
            break;
            case types.BUILDER_CHANGE_USER:
            this._params.envInfo.user = action.user;
            this.emitChange();
            break;
            case types.BUILDER_CHANGE_LABEL_ITEMS:
            this._params.envInfo.label = action.items;
            this.emitChange();
            break;
            case types.BUILDER_CHANGE_RUN_ITEMS:
            this._params.envInfo.run = action.items;
            this.emitChange();
            break;
            case types.BUILDER_CHANGE_SOURCE_CODE_ITEMS:
            this._params.envInfo.sourceCode = action.items;
            this.emitChange();
            break;
            case types.BUILDER_CHANGE_EXPOSE_ITEMS:
            this._params.envInfo.expose = action.items;
            this.emitChange();
            break;
            case types.BUILDER_CHANGE_VOLUME_ITEMS:
            this._params.envInfo.volume = action.items;
            this.emitChange();
            break;
            case types.BUILDER_CHANGE_ADD_ITEMS:
            action.items.forEach(i => {
                // If file content, parse file
                if (i.content) {
                    this._params.files.push({
                        name: i.name.split(':')[0],
                        content: i.content
                    });

                    // Change the root to the name child
                    i = i.name;
                }

                this._params.envInfo.add.push(i);
            });

            this.emitChange();
            break;
            case types.BUILDER_CHANGE_ENV_ITEMS:
            this._params.envInfo.env = action.items;
            this.emitChange();
            break;
            case types.BUILDER_CHANGE_CMD_ITEMS:
            this._params.envInfo.cmd = action.items;
            this.emitChange();
            break;
            case types.BUILDER_PROJECT_NAME_CHANGE:
            this._params.meta.name = action.projectName;
            this.emitChange();
            break;
            case types.BUILDER_FINISH_params:
            default:
            console.log(action);
                console.log(action.actionType + ' Not Implemented');
        }
    }

    get dockerfile() {
        return this._params;
    }

    get currentStep() {
        return this._currentStep;
    }

    get steps() {
        return this._builderSteps;
    }

    get featuredDistributions() {
        return this._featuredDistributions;
    }

    get params() {
        return this._params;
    }
}

export default new BuilderStore();
