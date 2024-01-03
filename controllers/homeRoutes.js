const router = require("express").Router();
// const { User, TaxPayers } = require("../models");
const User = require('../models/user');
const TaxPayers = require('../models/taxpayers');

router.get("/", async (req, res) => {
  try {
    // const taxpayerData = await TaxPayer.findByPk({
    //     where: {
    //         user_id: req.session.user_id,
    //     }
    // })

    // const taxpayers = taxpayerData.map((taxpayer) => taxpayer.get({plain: true}));

    res.render("homepage", {
      // taxpayers,
      logged_in: req.session.logged_in,
    });
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

router.get("/profile", async (req, res) => {
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
    // console.log(users);
    // console.log(taxpayers);
    
  } catch(err) {
  console.log(err);
  }
});
// try{
//     const userData = await User.findByPk(req.session.user_id);
//     if(userData.ok){
//         const response = await TaxPayer.findAll({
//             where: { id: req.session.id },
//           });
//           if(response.ok){
//             res.status(200).json(response);
//           } else {
//             res.status(400).json("Error Has Occured");
//           }
//     }

//     const user = userData.get({ plain: true });

//     res.render('profile', {
//         ...user,
//         logged_in: req.session.logged_in,
//     })
// } catch(err) {
//     res.status(500).json(err);

// }
// });

router.get("/calculator", async (req, res) => {
  try {
    res.render("calculator", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/newTaxPayer", async (req, res) => {
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
