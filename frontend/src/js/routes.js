import React from 'react/addons';
import Router from 'react-router';
import App from './components/App';
import BuilderStep1Page from './components/BuilderStep1Page';
import BuilderStep2Page from './components/BuilderStep2Page';
import BuilderStep3Page from './components/BuilderStep3Page';
import BuilderStep4Page from './components/BuilderStep4Page';
import BuilderStep5Page from './components/BuilderStep5Page';
import BuilderStep6Page from './components/BuilderStep6Page';
import BuilderStep7Page from './components/BuilderStep7Page';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;

var routes = (
    <Route name="app" path="/" handler={App}>
      <Route name="BuilderStep1Page" path="/builder/1" handler={BuilderStep1Page} />
      <Route name="BuilderStep2Page" path="/builder/2" handler={BuilderStep2Page} />
      <Route name="BuilderStep3Page" path="/builder/3" handler={BuilderStep3Page} />
      <Route name="BuilderStep4Page" path="/builder/4" handler={BuilderStep4Page} />
      <Route name="BuilderStep5Page" path="/builder/5" handler={BuilderStep5Page} />
      <Route name="BuilderStep6Page" path="/builder/6" handler={BuilderStep6Page} />
      <Route name="BuilderStep7Page" path="/builder/7" handler={BuilderStep7Page} />
      <Route name="LoginPage" path="/login" handler={LoginPage} />
      <Route name="RegisterPage" path="/register" handler={RegisterPage} />
      <DefaultRoute name="default" handler={BuilderStep1Page}/>
    </Route>
);

module.exports = routes;
