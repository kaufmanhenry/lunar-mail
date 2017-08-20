// Simple helper method for handling requests
const handleRequest = res => (err, response) => {
  if (err) return res.status(err.status || 500).send(err);

  return res.status(200).send(response || {});
};

module.exports = handleRequest;
