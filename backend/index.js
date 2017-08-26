const { Router } = require('express');

const router = Router();

router.use('/auth', require('./routes/Auth'));
router.use('/users', require('./routes/User'));
router.use('/emails', require('./routes/Email'));

module.exports = router;
