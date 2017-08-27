import createApiRequest from '../../utils/createApiRequest';

export const SAVE_EMAIL_REQUEST = 'email/SAVE_EMAIL_REQUEST';
export const SAVE_EMAIL_SUCCESS = 'email/SAVE_EMAIL_SUCCESS';
export const SAVE_EMAIL_FAILURE = 'email/SAVE_EMAIL_FAILURE';

export const LOGOUT = 'user/LOGOUT';

const defaultState = {
  loading: false,
  loaded: false,
  emails: []
};

export default function (state = defaultState, action) {
  const { response } = action;
  switch (action.type) {
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
        loaded: true,
        emails: state.emails.concat([response])
      };
    case SAVE_EMAIL_FAILURE:
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
