import React from 'react';
import { Route } from 'react-router';

import App from './containers/App';
import Emails from './containers/Emails';
import Email from './containers/Email';
import NewEmail from './containers/NewEmail';
import Login from './containers/Login';
import SignUp from './containers/SignUp';

const TOKEN_NAME = 'lunar-mail-token';

const checkAuth = (nextState, replace, callback) => {
  // An authentication token
  const token = localStorage.getItem(TOKEN_NAME);
  // The next route the user plans to go to
  const nextLoc = nextState.location.pathname;
  // If the user does not have a token, redirect to login
  if (!token && nextLoc !== '/login' && nextLoc !== '/signup') replace('/login');
  // If the user has a token, redirect to app
  if (token && (nextLoc === '/login' || nextLoc === '/signup' || nextLoc === '/')) replace('/emails');
  return callback();
};

const routes = (
  <div>
    <Route path="/" onEnter={checkAuth} component={App}>
      <Route path="emails" component={Emails} />
      <Route path="emails/:id" component={Email} />
      <Route path="createEmail" component={NewEmail} />
    </Route>
    <Route path="/login" component={Login} onEnter={checkAuth} />
    <Route path="/signup" component={SignUp} onEnter={checkAuth} />
  </div>
);

export default routes;