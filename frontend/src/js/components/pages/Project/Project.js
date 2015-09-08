import React, { PropTypes } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import BaseComponent from '../../BaseComponent';
import ProjectStore from '../../../stores/ProjectStore';
import ProjectActions from '../../../actions/ProjectActions';
import ProjectService from '../../../services/ProjectService';

export default class Project extends BaseComponent {

  constructor() {
    super();
    this.state = {
      _projects: []
    }
  }

  componentDidMount() {
    var self = this;

    ProjectService.fetchProjects(function(projects){
      // store
      self.setState({_projects: projects});
      self.forceUpdate();
    });
  }

  render() {

      return (
          <DashboardLayout>
              <h1>Projects</h1>
            <ul>
                {this.state._projects.map((project) => {
                  return <li key={project.id}>{project.name}</li>
                })}
              </ul>
          </DashboardLayout>
      )
  }

}
