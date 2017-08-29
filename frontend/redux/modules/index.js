import { combineReducers } from 'redux';

import user from './user';
import email from './email';

const reducers = combineReducers({
  user,
  email
});

export default reducers;
