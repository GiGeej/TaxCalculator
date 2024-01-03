const router = require("express").Router();
const User = require("../../models/user");
const auth = require('../../helpers/auth');


router.post("/newUser", async (req, res) => {
  try {
    //check account exists
    const existingEmail = await User.findOne({
      where: { email: req.body.email },
    });
    if (!existingEmail) {
      //if no account exists, pass check, create account
      const userData = await User.create(req.body);

      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;

        res.status(200).json(userData);
      });
    } else {
      // if account exists, fail check
      res.status(500).json({ message: "Email already exists" });
    }
  } catch (err) {
    //other error
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: "No Account Found" });
    } else {
      const validPassword = await userData.checkPassword(req.body.password);

      if (!validPassword) {
        res.status(400).json({ message: "Incorrect combination" });
      } else {
        req.session.save(() => {
          req.session.user_id = userData.user_id;
          req.session.logged_in = true;

          res.status(200).json({ message: "logged in " + userData.username });
        });
      }
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", auth, (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get("/all", async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password", "user_id"] },
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/currentId", auth, async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        user_id: req.session.user_id,
      },
      attributes: {
        exclude: ["password"],
      },
    });
    if (!userData) {
      res.status(400).json("Not Logged In");
    } else {
      res.status(200).json(userData.user_id);
    }

  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    if (req.session.logged_in) {
      if (req.session.user_id == req.params.id) {
        const userData = await User.findOne({
          where: {
            user_id: req.params.id,
          },
        });
        res.status(200).json(userData);
      } else {
        res
          .status(500)
          .json({ message: "Cannot access someone elses account!" });
        return;
      }
    } else {
      res.status(400).json({ message: "Please Log In" });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
