import React from 'react/addons';
import Router from 'react-router';
import App from './components/App';
import BuilderStep1Page from './components/pages/Builder/BuilderStep1';
import BuilderStep2Page from './components/pages/Builder/BuilderStep2';
import BuilderStep3Page from './components/pages/Builder/BuilderStep3';
import BuilderStep4Page from './components/pages/Builder/BuilderStep4';
import BuilderStep5Page from './components/pages/Builder/BuilderStep5';
import BuilderStep6Page from './components/pages/Builder/BuilderStep6';
import BuilderStep7Page from './components/pages/Builder/BuilderStep7';
import LoginPage from './components/pages/Login';
import RegisterPage from './components/pages/Register';

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
