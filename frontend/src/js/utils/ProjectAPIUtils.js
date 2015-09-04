/**
 * Created by Maxim on 03/09/2015.
 */
import ProjectActions from '../actions/ProjectActions';
import reqwest from 'reqwest';

var ProjectAPIUtils = {
  getProjectData: function() {

    reqwest({
      url: 'http://localhost:1337/organisations/1/projects',
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      headers: {
        'Authorization': 'JWT ' + localStorage.getItem('jwt')
      },
      complete: function(resp) {
        console.log(resp);
      }
    });

  }
};

export default ProjectAPIUtils;
