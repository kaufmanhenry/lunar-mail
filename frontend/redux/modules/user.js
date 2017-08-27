import createApiRequest from '../../utils/createApiRequest';
import { setTokenAndRedirect, TOKEN_NAME } from '../../utils/handleRouteAuth';

export const FETCH_USERS = 'user/FETCH_USERS';
export const FETCH_USERS_REQUEST = 'user/FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'user/FETCH_USERS_SUCCESS';

export const LOGIN_REQUEST = 'user/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'user/LOGIN_FAILURE';

export const SIGNUP_REQUEST = 'user/SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'user/SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'user/SIGNUP_FAILURE';

export const VALIDATE_TOKEN_REQUEST = 'user/VALIDATE_TOKEN_REQUEST';
export const VALIDATE_TOKEN_SUCCESS = 'user/VALIDATE_TOKEN_SUCCESS';
export const VALIDATE_TOKEN_FAILURE = 'user/VALIDATE_TOKEN_FAILURE';

export const LOGOUT = 'user/LOGOUT';

const defaultState = {
  loading: false,
  loaded: false,
  user: {},
  token: ''
};

export default function (state = defaultState, action) {
  const { response } = action;
  switch (action.type) {
    case LOGIN_REQUEST:
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: response.user,
        token: response.token
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true
      };
    case LOGIN_FAILURE:
    case SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: response
      };
    case LOGOUT:
      return {
        ...state,
        user: {}
      };
    case VALIDATE_TOKEN_SUCCESS:
      console.log(state, response);
      return {
        ...state,
        user: response.user,
        token: response.token
      };
    default:
      return state;
  }
}

export function signupRequest(name, email, password) {
  return {
    type: [SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE],
    promise: createApiRequest('users', 'POST', { name, email, password })
  };
}

export function signupFlow({ name, email, password }) {
  return dispatch =>
    dispatch(signupRequest(name, email, password))
    .then(
      response => setTokenAndRedirect(response),
      (err) => {
        throw Error(err);
      });
}

export function loginRequest(email, password) {
  return {
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
    promise: createApiRequest('auth', 'POST', { email, password })
  };
}

export function loginFlow({ email, password }) {
  return dispatch =>
    dispatch(loginRequest(email, password))
    .then(
      response => setTokenAndRedirect(response),
      (err) => {
        throw Error(err);
      });
}

export function logoutRequest() {
  return {
    type: LOGOUT
  };
}

export function logoutFlow() {
  return (dispatch) => {
    dispatch(logoutRequest);
    return setTokenAndRedirect(null);
  };
}

export function validateToken() {
  return {
    types: [VALIDATE_TOKEN_REQUEST, VALIDATE_TOKEN_SUCCESS, VALIDATE_TOKEN_FAILURE],
    promise: createApiRequest('auth/validate', 'POST', { token: localStorage.getItem(TOKEN_NAME) })
  };
}
