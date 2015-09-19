/**
 * Created by Maxim on 03/09/2015.
 */
import ProjectActions from '../actions/ProjectActions';
import reqwest from 'reqwest';
import request from 'superagent';

var ProjectAPIUtils = {
  getProjectData: function() {

    request
      .get('http://localhost:1337/organisations/1/projects')
      .set('Authorization', 'JWT ' + localStorage.getItem('bearer'))
      .end(function(err, res){
        console.log(err);
        console.log(res);
      })
    //reqwest({
    //  url: 'http://localhost:1337/organisations/1/projects',
    //  method: 'GET',
    //  crossOrigin: true,
    //  type: 'json',
    //  headers: {
    //    'Authorization': 'JWT ' + localStorage.getItem('jwt')
    //  },
    //  complete: function(resp) {
    //    console.log(resp);
    //  }
    //});

  }
};

export default ProjectAPIUtils;
