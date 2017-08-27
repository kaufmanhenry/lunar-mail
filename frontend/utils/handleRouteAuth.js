import { hashHistory } from 'react-router';

export const TOKEN_NAME = 'lunar-mail-token';

export function setTokenAndRedirect(data) {
  if (data && data.response && data.response.token) {
    localStorage.setItem(TOKEN_NAME, data.response.token);
    hashHistory.push('/');
  } else {
    localStorage.removeItem(TOKEN_NAME);
    hashHistory.push('/login');
  }
}

export default function checkAuth(nextState, replace, callback) {
  // An authentication token
  const token = localStorage.getItem(TOKEN_NAME);
  // The next route the user plans to go to
  const nextLoc = nextState.location.pathname;
  // If the user does not have a token, redirect to login
  if (!token && nextLoc !== '/login' && nextLoc !== '/signup') replace('/login');
  // If the user has a token, redirect to app
  if (token && (nextLoc === '/login' || nextLoc === '/signup' || nextLoc === '/')) replace('/emails');
  return callback();
}
