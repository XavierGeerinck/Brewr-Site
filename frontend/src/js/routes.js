import React from 'react/addons';
import { Router, Route, IndexRoute  } from 'react-router';
import App from './components/App';
import BuilderPage from './components/pages/Builder';
import LoginPage from './components/pages/Login';
import RegisterPage from './components/pages/Register';
import TeamPage from './components/pages/Team';
import ProjectPage from './components/pages/Project';
import HomePage from './components/pages/Home';
import NotFoundPage from './components/pages/NotFound';

const createBrowserHistory = require('history/lib/createBrowserHistory');

let history = createBrowserHistory();

// Todo: add onEnter={requireAuth} to projects, teams, builder paths!!
// <Router history={history}>
var routes = (
    <Router>
        <Route path="/" component={App}>
            <IndexRoute component={HomePage} />
            <Route path="builder"   component={BuilderPage} />
            <Route path="login"     component={LoginPage} />
            <Route path="register"  component={RegisterPage} />
            <Route path="teams"     component={TeamPage} />
            <Route path="projects"  component={ProjectPage} />
            <Route path="*"         component={NotFoundPage} />
        </Route>
    </Router>
);

export default routes;
