const router = require('express').Router();
const User = require('../../models/user');

router.post('/newUser', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
    try {
        console.log(req.body.email);
        const userData = await User.findOne({where: {email: req.body.email} });
        
        if(!userData) {
            res.status(400)
            .json({message: 'Incorrect combination, try again'});
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);

        if(!validPassword) {
            res.status(400)
            .json({message: "Incorrect combination, try again"});
        }

        req.session.save(() => {
            console.log("sess: ", req.session);

            req.session.user_id = userData.user_id;
            req.session.logged_in = true;

            console.log("Loggen In")
            res.json({message: "Logged In, Now"});
        })

    } catch(err) {
        res.status(400).json(err);
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

router.get("/currentId", async (req,res) => {
    try{
        req.session.user_id = userData.user_id;
        console.log(req.session.user_id);
        res.status(200);
        return usderData.user_id;
    } catch(err) {
        res.status(400).json(err);
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
        
        } else {
            res.status(200).json({message: "Please Log In"});
            return;
        }
    } catch(err) {
        res.status(500).json(err);
        console.log(err);
    }
})

module.exports = router;