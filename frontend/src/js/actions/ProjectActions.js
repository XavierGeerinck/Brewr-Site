/**
 * Created by Maxim on 03/09/2015.
 */
import AppDispatcher from '../Dispatcher';
import ProjectConstants from '../constants/ProjectConstants';

var ProjectActions = {

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
