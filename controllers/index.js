const router = require('express').Router();

const homeRoutes = require('./homeRoute');
const dashRoutes = require('./dashboardRoutes');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;