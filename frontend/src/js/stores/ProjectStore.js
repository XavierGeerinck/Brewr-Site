import Dispatcher from '../dispatchers/AppDispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';
import ProjectConstants from '../constants/ProjectConstants.js';

var CHANGE_EVENT = 'change';

var _projects = {};

/**
 *
 * @param {Object} object
 *    => id, id of the project
 *    => name, name of the project
 */
function create(object) {
  _projects[object.id] = object;
}

function update(id, updates) {
  _projects[id] = assign({}, _projects[id], updates);
}

function updateAll(updates) {
  for(var id in _projects) {
    update(id, updates);
  }
}

function destroy(id) {
  delete _projects[id];
}

var ProjectStore = assign({}, BaseStore, {

  /**
   * Get the entire collection of projects
   * @return {object}
   */
  getAll: function() {
    return _projects;
  }
});

Dispatcher.register(function(action) {

  var project;

  switch(action.actionType) {
    case ProjectConstants.PROJECT_CREATE:
      project = action.project;
          if(project !== null) {
            create(project);
            ProjectStore.emitChange();
          }
          break;
    case ProjectConstants.PROJECT_DESTROY:
      destroy(action.id);
      ProjectStore.emitChange();
      break;
    case ProjectConstants.PROJECT_UPDATE:
      project = action.project;
      if(project !== null) {
        update(project.id, project);
        ProjectStore.emitChange();
      }
      break;
    default:
  }

});

export default ProjectStore;
