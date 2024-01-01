const router = require('express').Router();
const { taxpayers } = require('../../models/taxpayers');

// check logged in status
const auth = "TODO";

// create new taxpayer
router.post('/', async(req, res) => {
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

module.exports = router;