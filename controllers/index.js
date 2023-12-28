const router = require('express').Router();

// const apiRoutes 
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
// Router use api

module.exports = router;