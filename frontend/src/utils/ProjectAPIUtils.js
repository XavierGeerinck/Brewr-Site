import * as ProjectServerActions from '../actions/ProjectServerActions';
import request from 'superagent';

export function getProjectImage(token, organisationUUID, projectId, revisionUUID) {
    request
    .get('http://localhost:8000/organisation/' + organisationUUID + '/project/' + projectId + '/revision/' + revisionUUID + '/image?type=json')
    .set('Authorization', 'Bearer ' + token)
    .end(function (err, res) {
        if (err) {
            return ProjectServerActions.receiveProjectErrorResponse(err);
        }
        
        return ProjectServerActions.receiveProjectImageResponse(res.body);
    });
}

export function getProject(token, organisationUUID, projectId) {
    request
    .get('http://localhost:8000/organisation/' + organisationUUID + '/project/' + projectId)
    .set('Authorization', 'Bearer ' + token)
    .end(function (err, res) {
        if (err) {
            return ProjectServerActions.receiveProjectErrorResponse(err);
        }

        return ProjectServerActions.receiveProjectResponse(res.body);
    });
}

export function assignMember(token, organisationUUID, projectId, memberId) {
  request
    .post('http://localhost:8000/organisation/' + organisationUUID + '/project/' + projectId + '/assign')
    .send({member: memberId})
    .set('Authorization', 'Bearer ' + token)
    .end(function(err, res){
      if(err) {
        return ProjectServerActions.receiveProjectErrorResponse(err);
      }
      return ProjectServerActions.assignMemberResponse(res.body);
    });
}

export function removeMember(token, organisationUUID, projectId, memberId) {
  request
    .del('http://localhost:8000/organisation/' + organisationUUID + '/project/' + projectId + '/members/' + memberId)
    .set('Authorization', 'Bearer ' + token)
    .end(function(err, res){
      if(err) {
        return ProjectServerActions.receiveProjectErrorResponse(err);
      }
      return ProjectServerActions.assignMemberResponse(res.body);
    });
}

export function create(token, organisationUUID, meta, files, projectInfo) {
    request
    .post('http://localhost:8000/organisation/' + organisationUUID + '/project')
    .send({ meta: meta, files: files, envInfo: projectInfo })
    .set('Authorization', 'Bearer ' + token)
    .end(function (err, res) {
        console.log(err);
        console.log(res.body);
    })
}
