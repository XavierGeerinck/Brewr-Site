/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import Router from 'react-routing/src/Router';
import http from './core/http';
import App from './components/App';
import ContentPage from './components/ContentPage';
import ContactPage from './components/ContactPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';
import BuilderStep1Page from './components/BuilderStep1Page';
import BuilderStep2Page from './components/BuilderStep2Page';
import BuilderStep3Page from './components/BuilderStep3Page';
import BuilderStep4Page from './components/BuilderStep4Page';
import BuilderStep5Page from './components/BuilderStep5Page';
import BuilderStep6Page from './components/BuilderStep6Page';
import BuilderStep7Page from './components/BuilderStep7Page';

const router = new Router(on => {

  on('*', async (state, next) => {
    const component = await next();
    return component && <App context={state.context}>{component}</App>;
  });

  on('/contact', async () => <ContactPage />);

  on('/login', async () => <LoginPage />);

  on('/register', async () => <RegisterPage />);

  on('/builder/1', async () => <BuilderStep1Page title="Image Builder" path="/builder/1" />);
  on('/builder/2', async () => <BuilderStep2Page title="Image Builder" path="/builder/2" />);
  on('/builder/3', async () => <BuilderStep3Page title="Image Builder" path="/builder/3" />);
  on('/builder/4', async () => <BuilderStep4Page title="Image Builder" path="/builder/4" />);
  on('/builder/5', async () => <BuilderStep5Page title="Image Builder" path="/builder/5" />);
  on('/builder/6', async () => <BuilderStep6Page title="Image Builder" path="/builder/6" />);
  on('/builder/7', async () => <BuilderStep7Page title="Image Builder" path="/builder/7" />);

  on('*', async (state) => {
    //const content = await http.get(`/api/content?path=${state.path}`);
    return <BuilderStep1Page title="Image Builder" path="/builder/1"/>;
  });

  on('error', (state, error) => state.statusCode === 404 ?
    <App context={state.context} error={error}><NotFoundPage /></App> :
    <App context={state.context} error={error}><ErrorPage /></App>);

});

export default router;
