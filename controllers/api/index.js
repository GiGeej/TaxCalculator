const router = require('express').Router();
const userRoutes = require('./userRoutes');
const taxPayerRoutes = require('./taxPayerRoutes');
const auth = require('../../helpers/auth');


router.use('/user', userRoutes);
router.use('/taxPayer', auth, taxPayerRoutes);

module.exports = router;
