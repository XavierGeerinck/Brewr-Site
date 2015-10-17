import * as OrganisationServerActions from '../actions/OrganisationServerActions';
import request from 'superagent';

export function getOrganisationMembers(token, organisationUUID) {
    request
    .get('http://localhost:8000/organisation/' + organisationUUID + '/members')
	.set('Authorization', 'Bearer ' + token)
    .end(function (err, res) {
        if (err) {
            return OrganisationServerActions.receiveGetOrganisationMembersErrorResponse(err);
        }

        return OrganisationServerActions.receiveGetOrganisationMembersResponse(res.body);
    });
}
