import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import apiMiddleware from './middleware/api';

import rootReducer from './modules';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line

export default function configureStore() {
  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(logger, thunk, apiMiddleware))
  );
}
