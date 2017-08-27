export const TOKEN_NAME = 'lunar-mail-token';

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
