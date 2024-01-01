const router = require('express').Router();
const userRoutes = require('./userRoutes');
const taxPayerRoutes = require('./taxPayerRoutes');

router.use('/user', userRoutes);
router.use('/taxPayer', taxPayerRoutes);

module.exports = router;
