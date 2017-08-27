import { hashHistory } from 'react-router';

import { TOKEN_NAME } from './handleRouteAuth';

export default function handleApiErrors(message) {
  if (message &&
    message.status &&
    (message.status.charAt(0) === 4 || message.status.charAt(0) === 5)) {
    localStorage.removeItem(TOKEN_NAME);
    hashHistory.push('/');
  }
  return message;
}
