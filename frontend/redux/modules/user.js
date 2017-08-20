import createApiRequest from '../../utils/createApiRequest';

export const FETCH_USERS = 'user/FETCH_USERS';
export const FETCH_USERS_REQUEST = 'user/FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'user/FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'user/FETCH_USERS_FAILURE';

const defaultState = {
  loading: false,
  loaded: false,
  users: []
};

export default function (state = defaultState, action) {
  const { response } = action;
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        users: response
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false
      };
    default:
      return state;
  }
}

export function fetchUsersRequest() {
  return {
    type: FETCH_USERS,
    promise: createApiRequest('users')
  };
}
