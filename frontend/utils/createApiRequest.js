import handleApiErrors from './handleApiErrors';
import { TOKEN_NAME } from './handleRouteAuth';

const defaultHeaders = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
  lunarMailToken: localStorage.getItem(TOKEN_NAME)
};

export default function createApiRequest(url, method, data, headers) {
  return new Promise((resolve, reject) => {
    fetch(`/api/${url}`, {
      method: method || 'GET',
      body: data ? JSON.stringify(data) : null,
      headers: {
        ...defaultHeaders,
        ...headers
      }
    })
    .then(response => resolve(response.json()))
    .catch(err => reject(handleApiErrors(err)));
  });
}
