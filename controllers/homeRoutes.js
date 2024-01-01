const router = require('express').Router();
const { User, TaxPayer } = require('../models');

router.get('/', async (req, res) => {
    try {   

        // const taxpayerData = await TaxPayer.findByPk({
        //     where: {
        //         user_id: req.session.user_id, 
        //     }
        // })

        // const taxpayers = taxpayerData.map((taxpayer) => taxpayer.get({plain: true}));

        res.render('homepage', {
            // taxpayers,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', async(req, res) => {
    if(req.session.logged_in){
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

router.get('/profile', async(req, res) => {
    
    try{
        const userData = await User.findByPk(req.session.user_id);

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: req.session.logged_in,
        })
    } catch(err) {
        res.status(400).json(err);
    }
})

router.get('/calculator', async(req, res) => {
    try{

        res.render('calculator', {
            logged_in: req.session.logged_in,
        });
    } catch(err) {
        res.status(400).json(err);
    }
})
module.exports = router;