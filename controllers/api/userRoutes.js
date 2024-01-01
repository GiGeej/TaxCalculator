const router = require('express').Router();
const User = require('../../models/user');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body)

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        }); 
    } catch(err) {
        res.status(400).json(err);
    }
})

router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({where: {username: req.body.email} });

        if(!userData) {
            res.status(400)
            .json({message: 'Incorrect combination, try again'});
            return;
        }

        // !!! Add check password to user model !!!

        // const validPassword = await userData.checkPassword(req.body.password);

        // if(!validPassword) {
        //     res.status(400)
        //     .json({message: "Incorrect combination, try again"});
        // }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: "Logged In"});
        })

    } catch(err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if(req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.get('/all', async (req, res) => {
    try{
        const userData = await User.findAll({
        attributes: {exclude: ['password', 'user_id']},
    });
    res.status(200).json(userData);
    }catch(err){
        res.status(400).json(err);
        console.log(err);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id);
        res.status(200).json(userData);
    } catch(err) {
        res.status(400).json(err);
        console.log(err);
    }
})

module.exports = router;