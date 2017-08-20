const { Router } = require('express');
const Email = require('../models/Email');

const handleRequest = require('../config/responseHandler');

const { authMiddleware } = require('../config/auth');

const router = Router();

router.get('/:email',
  authMiddleware,
  (req, res) => Email.find({ _id: req.params.email }, handleRequest(res)));

router.post('/', authMiddleware, (req, res) => {
  const email = new Email(req.body);

  return email.save(handleRequest(res));
});

router.put('/:email',
  authMiddleware,
  (req, res) =>
    Email.findOneAndUpdate(
      { _id: req.params.location },
      req.body,
      handleRequest(res)
    ));

router.delete('/:location',
  authMiddleware,
  (req, res) => Email.remove({ _id: req.params.location }, handleRequest(res)));

module.exports = router;
