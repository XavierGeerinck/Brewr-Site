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
import DashboardPage from './components/pages/Dashboard';
import LogoutPage from './components/pages/Logout';
import AuthStore from './stores/AuthStore';

const createBrowserHistory = require('history/lib/createBrowserHistory');

let history = createBrowserHistory();

// Todo: add onEnter={requireAuth} to projects, teams, builder paths!!
// <Router history={history}>
function requireAuth(nextState, replaceState) {
    if (!AuthStore.isLoggedIn) {
        replaceState({ nextPathname: nextState.location.pathname }, '/login');
    }
}

var routes = (
    <Router>
        <Route path="/" component={App}>
            <IndexRoute component={HomePage} />
            <Route path="builder"   component={BuilderPage} />
            <Route path="login"     component={LoginPage} />
            <Route path="register"  component={RegisterPage} />
            <Route path="logout"    component={LogoutPage} onEnter={requireAuth} />
            <Route path="dashboard" component={DashboardPage} onEnter={requireAuth} />
            <Route path="teams"     component={TeamPage} onEnter={requireAuth} />
            <Route path="projects"  component={ProjectPage} onEnter={requireAuth} />
            <Route path="*"         component={NotFoundPage} />
        </Route>
    </Router>
);

export default routes;
