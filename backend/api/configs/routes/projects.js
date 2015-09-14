'use strict';

var ProjectController = require('../../controllers/ProjectController');

module.exports = [
    {
        method: 'GET',
        path: '/organisations/{organisation}/projects',
        config: {handler: ProjectController.index}
    },
    {
        method: 'GET', path: '/organisations/{organisation}/projects/{project}',
        config: { handler: ProjectController.show }
    },
    {
        method: 'GET', path: '/organisations/{organisation}/projects/assigned',
        config: { handler: ProjectController.assigned }
    },
    {
        method: 'POST', path: '/organisations/{organisation}/projects/{project}/assign',
        config: { handler: ProjectController.assign }
    },
    {
        method: 'POST', path: '/projects',
        config: {handler: ProjectController.create }
    }
];
