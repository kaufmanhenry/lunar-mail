import { hashHistory } from 'react-router';

import createApiRequest from '../../utils/createApiRequest';

export const SAVE_EMAIL_REQUEST = 'email/SAVE_EMAIL_REQUEST';
export const SAVE_EMAIL_SUCCESS = 'email/SAVE_EMAIL_SUCCESS';
export const SAVE_EMAIL_FAILURE = 'email/SAVE_EMAIL_FAILURE';

export const UPDATE_EMAIL_REQUEST = 'email/UPDATE_EMAIL_REQUEST';
export const UPDATE_EMAIL_SUCCESS = 'email/UPDATE_EMAIL_SUCCESS';
export const UPDATE_EMAIL_FAILURE = 'email/UPDATE_EMAIL_FAILURE';

export const FETCH_EMAILS_REQUEST = 'email/FETCH_EMAILS_REQUEST';
export const FETCH_EMAILS_SUCCESS = 'email/FETCH_EMAILS_SUCCESS';
export const FETCH_EMAILS_FAILURE = 'email/FETCH_EMAILS_FAILURE';

export const FETCH_EMAIL_REQUEST = 'email/FETCH_EMAIL_REQUEST';
export const FETCH_EMAIL_SUCCESS = 'email/FETCH_EMAIL_SUCCESS';
export const FETCH_EMAIL_FAILURE = 'email/FETCH_EMAIL_FAILURE';

const defaultState = {
  loading: false,
  loaded: false,
  emails: []
};

export default function (state = defaultState, action) {
  const { response } = action;
  switch (action.type) {
    case FETCH_EMAILS_REQUEST:
    case SAVE_EMAIL_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case SAVE_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true
      };
    case FETCH_EMAILS_FAILURE:
    case SAVE_EMAIL_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: response
      };
    case FETCH_EMAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        emails: response
      };
    case FETCH_EMAIL_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case FETCH_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        email: response.email,
        stats: response.stats
      };
    case FETCH_EMAIL_FAILURE:
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

// Save an email
export function saveEmailRequest(name, subject, body, user) {
  return {
    types: [SAVE_EMAIL_REQUEST, SAVE_EMAIL_SUCCESS, SAVE_EMAIL_FAILURE],
    promise: createApiRequest('emails', 'POST', { name, subject, body, user })
  };
}

export function saveEmailFlow({ name, subject, body }) {
  return (dispatch, getState) => {
    const { user } = getState();
    return dispatch(saveEmailRequest(name, subject, body, user.user))
      .then(response => hashHistory.push(`emails/${response.response._id}`));
  };
}

// Update an email
export function updateEmailRequest(id, email) {
  return {
    types: [UPDATE_EMAIL_REQUEST, UPDATE_EMAIL_SUCCESS, UPDATE_EMAIL_FAILURE],
    promise: createApiRequest(`emails/${id}`, 'POST', email)
  };
}

// Fetch all emails
export function fetchEmailsRequest(userId) {
  return {
    types: [FETCH_EMAILS_REQUEST, FETCH_EMAILS_SUCCESS, FETCH_EMAILS_FAILURE],
    promise: createApiRequest(`users/${userId}/emails`)
  };
}

export function fetchEmailsFlow() {
  return (dispatch, getState) => {
    const { user } = getState();

    return dispatch(fetchEmailsRequest(user.user._id)); // eslint-disable-line
  };
}

// Fetch a single email
export function fetchEmailRequest(id) {
  return {
    types: [FETCH_EMAIL_REQUEST, FETCH_EMAIL_SUCCESS, FETCH_EMAIL_FAILURE],
    promise: createApiRequest(`emails/${id}`)
  };
}
