import { TOKEN_NAME } from './handleRouteAuth';

export default function handleApiErrors(message) {
  if (message &&
    message.status &&
    (message.status.toString()[0] === '4' || message.status.toString()[0] === '5')) {
    localStorage.removeItem(TOKEN_NAME);
    throw new Error(message.message);
  }
  return message;
}
