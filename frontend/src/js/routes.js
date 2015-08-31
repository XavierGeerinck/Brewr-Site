import React from 'react/addons';
import Router from 'react-router';
import App from './components/App';
import BuilderPage from './components/pages/Builder';
import LoginPage from './components/pages/Login';
import RegisterPage from './components/pages/Register';
import TeamPage from './components/pages/Team';

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;

var routes = (
    <Route name="app" path="/" handler={App}>
      <Route name="BuilderPage" path="/builder" handler={BuilderPage} />
      <Route name="LoginPage" path="/login" handler={LoginPage} />
      <Route name="RegisterPage" path="/register" handler={RegisterPage} />
      <Route name="TeamPage" path="/teams" handler={TeamPage}/>
      <DefaultRoute name="default" handler={BuilderPage}/>
    </Route>
);

module.exports = routes;
