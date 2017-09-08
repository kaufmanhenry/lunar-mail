import createApiRequest from '../../utils/createApiRequest';

export const CREATE_ACCESS_CODE_REQUEST = 'accessCode/CREATE_ACCESS_CODE_REQUEST';
export const CREATE_ACCESS_CODE_SUCCESS = 'email/CREATE_ACCESS_CODE_SUCCESS';
export const CREATE_ACCESS_CODE_FAILURE = 'email/CREATE_ACCESS_CODE_FAILURE';

const defaultState = {
  loading: false,
  loaded: false,
  emails: []
};

export default function (state = defaultState, action) {
  const { response } = action;
  switch (action.type) {
    case CREATE_ACCESS_CODE_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case CREATE_ACCESS_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        accessCode: response
      };
    case CREATE_ACCESS_CODE_FAILURE:
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

// Create an access code
export function createAccessCodeRequest(user) {
  return {
    types: [CREATE_ACCESS_CODE_REQUEST, CREATE_ACCESS_CODE_SUCCESS, CREATE_ACCESS_CODE_FAILURE],
    promise: createApiRequest('accessCodes', 'POST', user)
  };
}

