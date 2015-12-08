import BaseStore from './BaseStore';
import * as actionTypes from '../constants/ActionTypes';

class OrganisationStore extends BaseStore {
    constructor() {
        super();

        this.subscribe(() => this._registerToActions.bind(this));
        this._members = [];
    }

    // We get a source back (VIEW or SERVER) with there the action in
    _registerToActions (source) {
        if (!source.action) {
            return;
        }

        switch(source.action.type) {
            case actionTypes.REQUEST_ORGANISATION_MEMBERS:
                console.log('doing request');
                break;
            case actionTypes.RESPONSE_ORGANISATION_MEMBERS:
                this._members = source.action.response;

                // Add role + priority id (high --> low)
                this._members.map(m => {
                    if (m.is_creator) {
                        m.role = "creator";
                        m.role_id = 3;
                    } else if (m.is_manager) {
                        m.role = "manager";
                        m.role_id = 2;
                    } else {
                        m.role = "user";
                        m.role_id = 1;
                    }
                });

                // Sort by role_id
                this._members.sort((a, b) => {
                    return (a.role_id < b.role_id);
                });

                this.emitChange();
                break;
            default:
                break;
        }
    }

    get allMembers() {
        return this._members;
    }

    get members() {
        return this._members.filter(m => {
            return !m.is_manager && !m.is_owner
        });
    }

    get managers() {
        return this._members.filter(m => {
            return m.is_manager === true && m.is_owner === false;
        });
    }

    get creator() {
        return this._members.filter(m => {
            return m.is_owner === true;
        });
    }
}

export default new OrganisationStore();
