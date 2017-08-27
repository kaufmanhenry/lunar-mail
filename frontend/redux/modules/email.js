import createApiRequest from '../../utils/createApiRequest';

export const SAVE_EMAIL_REQUEST = 'email/SAVE_EMAIL_REQUEST';
export const SAVE_EMAIL_SUCCESS = 'email/SAVE_EMAIL_SUCCESS';
export const SAVE_EMAIL_FAILURE = 'email/SAVE_EMAIL_FAILURE';

export const FETCH_EMAILS_REQUEST = 'email/FETCH_EMAILS_REQUEST';
export const FETCH_EMAILS_SUCCESS = 'email/FETCH_EMAILS_SUCCESS';
export const FETCH_EMAILS_FAILURE = 'email/FETCH_EMAILS_FAILURE';

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
    default:
      return state;
  }
}

export function saveEmailRequest(name, subject, body, user) {
  return {
    types: [SAVE_EMAIL_REQUEST, SAVE_EMAIL_SUCCESS, SAVE_EMAIL_FAILURE],
    promise: createApiRequest('emails', 'POST', { name, subject, body, user })
  };
}

export function saveEmailFlow({ name, subject, body }) {
  return (dispatch, getState) => {
    const { user } = getState();
    return dispatch(saveEmailRequest(name, subject, body, user.user.user));
  };
}

export function fetchEmailsRequest(userId) {
  return {
    types: [FETCH_EMAILS_REQUEST, FETCH_EMAILS_SUCCESS, FETCH_EMAILS_FAILURE],
    promise: createApiRequest(`users/${userId}/emails`)
  };
}

export function fetchEmailsFlow() {
  return (dispatch, getState) => {
    const { user } = getState();

    if (!user.user._id) return Promise.resolve(); // eslint-disable-line

    return dispatch(fetchEmailsRequest(user.user._id)); // eslint-disable-line
  };
}
