import React from 'react';
import Router from 'react-router';
import routes from './routes';
import RouterContainer from './services/RouterContainer';
import LoginActions from './actions/LoginActions';

var router = Router.create({
  routes: routes
});
RouterContainer.set(router);

let jwt = localStorage.getItem('jwt');
if(jwt) {
  LoginActions.loginUser(jwt);
}
router.run(Handler => React.render(<Handler />, document.body));
