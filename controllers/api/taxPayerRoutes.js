const router = require('express').router;
const { taxpayers } = require('../../models');

// check logged in status
const auth = "TODO";

// create new taxpayer
router.post('/', auth, async(req, res) => {
    try{
        const newTaxPayer = await taxpayers.create({
            ...req.body,
            user_id: req.session.user_id, 
        });

        res.status(200).json(newTaxPayer);
    } catch (err) {
        res.status(500).json(err);
    }
})

// view taxpayer

module.exports = router;