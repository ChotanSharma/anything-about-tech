const router = require('express').Router();
const userRoutes = require('./userRoutes');

// full path is "/api/login":
router.use('/user', userRoutes);

module.exports = router;

