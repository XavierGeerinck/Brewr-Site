import BaseStore from './BaseStore';
import * as types from '../constants/ActionTypes';

class BuilderStore extends BaseStore {
    constructor () {
        super();

        this.subscribe(() => this._registerToActions.bind(this));

        // this._dockerfile = {
        //     distribution: null, // FROM (base)
        //     distribution_version: null, // FROM (version)
        //     instructions: {
        //         maintainer: null, // The MAINTAINER instruction allows you to set the Author field of the generated images.
        //         label: [], // The LABEL instruction adds metadata to an image. A LABEL is a key-value pair. (LABEL <key>=<value> <key>=<value> <key>=<value>)
        //         workdir: null, // The WORKDIR instruction sets the working directory
        //         user: null, // The USER instruction sets the user name or UID to use when running the image
        //
        //         // TODO
        //         cmd: null,
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

        this._dockerfile = {
            "distribution": "ubuntu",
            "distribution_version": "14.04",
            "instructions": {
                "maintainer": "Xavier",
                "label": [
                    {
                        "value": "com.brewr.io=somevalue",
                        "id": 0
                    }
                ],
                "workdir": "/home/xavier",
                "user": "root",
                "run": [
                    {
                        "value": "sudo apt-get install nodejs",
                        "id": 0
                    },
                    {
                        "value": "sudo apt-get install nginx",
                        "id": 1
                    },
                    {
                        "value": "sudo apt-get install mariadb",
                        "id": 2
                    },
                    {
                        "value": "sudo apt-get install mongodb",
                        "id": 3
                    }
                ],
                "cmd": [
                    {
                        "value": "nginx -g daemon off;"
                    }
                ],
                "expose": [
                    {
                        "value": "80:80",
                        "id": 0
                    },
                    {
                        "value": "3306:3306",
                        "id": 1
                    },
                    {
                        "value": "8000:8000",
                        "id": 2
                    }
                ],
                "env": [
                    {
                        "value": "ENVIRONMENT=staging",
                        "id": 0
                    },
                    {
                        "value": "TEST=test123",
                        "id": 1
                    }
                ],
                "add": [
                    {
                        "value": "config/nginx.conf /etc/nginx/nginx.conf",
                        "id": 0
                    },
                    {
                        "value": "log /var/log",
                        "id": 1
                    }
                ],
                "copy": null,
                "entrypoint": null,
                "volume": [
                    {
                        "value": "/data",
                        "id": 0
                    },
                    {
                        "value": "/c/Users/thebi/logs:/var/logs",
                        "id": 1
                    }
                ],
                "onbuild": null
            }
        };

        this._hubSearchTerm = '';
        this._currentStep = 3;
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
            case types.BUILDER_PREVIOUS_PAGE:
            if (this._currentStep > 1) {
                this._currentStep--;
            } else {
                this._currentStep = 1;
            }
            break;
            case types.BUILDER_CHANGE_MAINTAINER:
            this._dockerfile.instructions.maintainer = action.maintainer;
            this.emitChange();
            break;
            case types.BUILDER_CHANGE_WORKDIR:
            this._dockerfile.instructions.workdir = action.workdir;
            this.emitChange();
            break;
            case types.BUILDER_CHANGE_USER:
            this._dockerfile.instructions.user = action.user;
            this.emitChange();
            break;
            case types.BUILDER_CHANGE_LABEL_ITEMS:
            this._dockerfile.instructions.label = action.items;
            this.emitChange();
            break;
            case types.BUILDER_CHANGE_RUN_ITEMS:
            this._dockerfile.instructions.run = action.items;
            this.emitChange();
            break;
            case types.BUILDER_CHANGE_EXPOSE_ITEMS:
            this._dockerfile.instructions.expose = action.items;
            this.emitChange();
            break;
            case types.BUILDER_CHANGE_VOLUME_ITEMS:
            this._dockerfile.instructions.volume = action.items;
            this.emitChange();
            break;
            case types.BUILDER_CHANGE_ADD_ITEMS:
            this._dockerfile.instructions.add = action.items;
            this.emitChange();
            break;
            case types.BUILDER_CHANGE_ENV_ITEMS:
            this._dockerfile.instructions.env = action.items;
            this.emitChange();
            break;
            case types.BUILDER_CHANGE_CMD_ITEMS:
            this._dockerfile.instructions.cmd = action.items;
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

    get featuredDistributions() {
        return this._featuredDistributions;
    }
}

export default new BuilderStore();
