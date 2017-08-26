const { Router } = require('express');
const User = require('../models/User');

const handleRequest = require('../config/responseHandler');

const { authMiddleware } = require('../config/auth');

const router = Router();

router.get('/:user', authMiddleware, (req, res) => User.find({ _id: req.params.user }, handleRequest(res)));

router.post('/', (req, res) => {
  const loc = new User(req.body);

  return loc.save(handleRequest(res));
});

router.put('/:user', authMiddleware, (req, res) =>
  User.findOneAndUpdate(
    { _id: req.params.user },
    req.body,
    handleRequest(res)
  )
);

router.delete('/:user', authMiddleware, (req, res) => User.remove({ _id: req.params.user }, handleRequest(res)));

module.exports = router;
