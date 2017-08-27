import createApiRequest from '../../utils/createApiRequest';

export const FETCH_USERS = 'user/FETCH_USERS';
export const FETCH_USERS_REQUEST = 'user/FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'user/FETCH_USERS_SUCCESS';

export const LOGIN_REQUEST = 'user/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'user/LOGIN_FAILURE';

export const SIGNUP_REQUEST = 'user/SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'user/SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'user/SIGNUP_FAILURE';

export const LOGOUT = 'user/LOGOUT';

const defaultState = {
  loading: false,
  loaded: false,
  user: {}
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
        user: response
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
    default:
      return state;
  }
}

export function signupRequest({ name, email, password }) {
  return {
    type: [SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE],
    promise: createApiRequest('users', 'POST', { name, email, password })
  };
}

export function loginRequest({ email, password }) {
  return {
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
    promise: createApiRequest('auth', 'POST', { email, password })
  };
}

export function logoutRequest() {
  return {
    type: LOGOUT
  };
}
