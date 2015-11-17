import * as ProjectServerActions from '../actions/ProjectServerActions';
import request from 'superagent';

export function getProject(token, organisationId, projectId) {
    request
    .get('http://localhost:8000/organisation/' + organisationId + '/project/' + projectId)
    .set('Authorization', 'Bearer ' + token)
    .end(function (err, res) {
        if (err) {
            return ProjectServerActions.receiveProjectErrorResponse(err);
        }

        return ProjectServerActions.receiveProjectResponse(res.body);
    });
}

export function assignMember(token, organisationId, projectId, memberId) {
  request
    .post('http://localhost:8000/organisation/' + organisationId + '/project/' + projectId + '/assign')
    .send({memberId: memberId})
    .set('Authorization', 'Bearer' + token)
    .end(function(err, res){
      if(err) {
        return ProjectServerActions.receiveProjectErrorResponse(err);
      }
      return ProjectServerActions.receiveProjectResponse(res.body);
    });
}

export function removeMember(token, organisationId, projectId, memberId) {
  request
    .del('http://localhost:8000/organisation/' + organisationId + '/project/' + projectId + '/member/' + memberId)
    .set('Authorization', 'Bearer' + token)
    .end(function(err, res){
      if(err) {
        return ProjectServerActions.receiveProjectErrorResponse(err);
      }
      return ProjectServerActions.receiveProjectResponse(res.body);
    });
}
