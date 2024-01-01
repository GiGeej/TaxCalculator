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
        console.log(req.body[0]);
        console.log(req.body[0].email);
        const userData = await User.findOne({where: {email: req.body[0].email} });
        
        if(!userData) {
            res.status(400)
            .json({message: 'Incorrect combination, try again'});
            return;
        }
        const validPassword = await userData.checkPassword(req.body[0].password);

        if(!validPassword) {
            res.status(400)
            .json({message: "Incorrect combination, try again"});
        }

        req.session.save(() => {
            req.session.user_id = userData.user_id;
            req.session.logged_in = true;

            res.json({message: "Logged In"});
            console.log(req)
        })

    } catch(err) {
        res.status(400).json(err);
        console.log("Username", req.body.username);
        console.log("Password", req.body.password);
        console.log(req.body);
        console.log(err);
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
        if(req.session.logged_in){
            if(req.session.user_id == req.params.id){
                const userData = await User.findOne({where: {
                    user_id: req.params.id,
                }});
                res.status(200).json(userData);
            } else {
                res.status(200).json({message: "Cannot access someone elses account!"});
                return;
            }
            console.log(req.session)
        
        } else {
            res.status(200).json({message: "Please Log In"});

            console.log("please log in");
            return;
        }
    } catch(err) {
        res.status(500).json(err);
        console.log(err);
    }
})

module.exports = router;