import React from 'react';
import { Router, hashHistory, Route } from 'react-router';

import App from './containers/App';
import Emails from './containers/Emails';
import Email from './containers/Email';
import NewEmail from './containers/NewEmail';
import Settings from './containers/Settings';
import Login from './containers/Login';
import SignUp from './containers/SignUp';

import checkAuth from './utils/handleRouteAuth';

const routes = (
  <Router history={hashHistory}>
    <Route path="/" onEnter={checkAuth} component={App}>
      <Route path="emails" component={Emails} />
      <Route path="emails/:id" component={Email} />
      <Route path="newEmail" component={NewEmail} />
      <Route path="settings" component={Settings} />
    </Route>
    <Route path="/login" component={Login} onEnter={checkAuth} />
    <Route path="/signup" component={SignUp} onEnter={checkAuth} />
  </Router>
);

export default routes;
