export default function createApiRequest(url, method, data) {
  return new Promise((resolve, reject) => {
    fetch(`/api/${url}`, {
      method: method || 'GET',
      body: data ? JSON.stringify(data) : null,
      headers: {
        
      }
    })
    .then(response => resolve(response.json()))
    .catch(err => reject(err));
  });
}