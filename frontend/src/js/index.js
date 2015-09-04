import React from 'react';
import Router from 'react-router';
import routes from './routes';
import RouterContainer from './services/RouterContainer';
import LoginActions from './actions/LoginActions';

import ProjectAPI from './utils/ProjectAPIUtils';

var router = Router.create({
  routes: routes
});
RouterContainer.set(router);

let jwt = localStorage.getItem('jwt');
if(jwt) {
  LoginActions.loginUser(jwt);
}

//TODO: load data in respectful component? Check FLUX way (should be in router somewhere)
// LOAD DATA
ProjectAPI.getProjectData();

router.run(Handler => React.render(<Handler />, document.body));
