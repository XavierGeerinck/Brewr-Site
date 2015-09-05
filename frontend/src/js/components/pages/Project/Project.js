import React, { PropTypes } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import BaseComponent from '../../BaseComponent';
import ProjectStore from '../../../stores/ProjectStore';

function getStateFromStores() {
  return {
    projects: ProjectStore.getAll()
  };
}

export default class Project extends BaseComponent {

  getInitialState() {
    return getStateFromStores();
  }

  render() {

      return (
          <DashboardLayout>
              <h1>Projects</h1>
              <ul>
                {this.state.projects.map((project) => {
                  <li>{project.name}</li>
                })}
              </ul>
          </DashboardLayout>
      )
  }

  _onChange() {
    this.setState(getStateFromStores());
  }

}
