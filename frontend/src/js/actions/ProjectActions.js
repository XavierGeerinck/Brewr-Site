import AppDispatcher from '../dispatchers/AppDispatcher';
import ProjectConstants from '../constants/ProjectConstants';
import ProjectService from '../services/ProjectService';

var ProjectActions = {

  load: function() {
    ProjectService.fetchProjects(function(projects){
      // store
      //DISPATCH LATER
    });
  },

  create: function(project) {
    AppDispatcher.dispatch({
      actionType: ProjectConstants.PROJECT_CREATE,
      project: project
    });
  },

  update: function(id, project) {
    AppDispatcher.dispatch({
      actionType: ProjectConstants.PROJECT_UPDATE,
      id: id,
      project: project
    })
  },

  destroy: function() {
    AppDispatcher.dispatch({
      actionType: ProjectConstants.PROJECT_DESTROY,
      id: id
    })
  }
};

export default ProjectActions;
