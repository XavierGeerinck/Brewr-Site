import * as ProjectServerActions from '../actions/ProjectServerActions';
import request from 'superagent';

export function getProject(token, organisationId, projectId) {
    request
    .post('http://localhost:8000/organisation/' + organisationId + '/project/' + projectId)
    .set('Authorization', 'Bearer ' + token)
    .end(function (err, res) {
        if (err) {
            return ProjectServerActions.receiveProjectErrorResponse(err);
        }

        return ProjectServerActions.receiveProjectResponse(res.body);
    });
}
