import { combineReducers } from 'redux';

import user from './user';
import email from './email';
import accessCode from './accessCode';

const reducers = combineReducers({
  user,
  email,
  accessCode
});

export default reducers;
