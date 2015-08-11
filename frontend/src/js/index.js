import React from 'react';
import Router from 'react-router';
import routes from './routes';

var router = Router.create({
  routes: routes
});

router.run(Handler => React.render(<Handler />, document.body));
