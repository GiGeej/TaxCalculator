const router = require("express").Router();
const User = require('../models/user');
const TaxPayers = require('../models/taxpayers');
const auth = require('../helpers/auth');

router.get("/", async (req, res) => {
  try {
    res.render("homepage", {});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

router.get("/profile", auth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id);
    const taxpayerData = await TaxPayers.findAll({
      where: { user_id: req.session.user_id },
    });
    const users = userData.get({plain: true});
    const taxpayers = taxpayerData.map((taxpayer) => taxpayer.get({plain: true}));

    res.render('profile', {
        ...users,
        taxpayers,
        logged_in: req.session.logged_in
    });
    
  } catch(err) {
  console.log(err);
  }
});

router.get("/calculator", async (req, res) => {
  try {
    res.render("calculator", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/newTaxPayer",auth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id);
    const user = userData.get({ plain: true });

    res.render("newTaxPayer", {
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;
