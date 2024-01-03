const router = require("express").Router();
const TaxPayer = require("../../models/taxpayers");
const User = require("../../models/user");

// check logged in status
const auth = "TODO";

// create new taxpayer
router.post("/newUser", async (req, res) => {
  try {
    const newTaxPayer = await TaxPayer.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newTaxPayer);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/all", async (req, res) => {
  try {
    const taxpayerData = await TaxPayer.findAll({
      attributes: ["first_name", "last_name"],
      order: ["taxpayer_id", "ASC"],
    });
    res.status(200).json(taxpayerData);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

//all with same ID
router.get("/byId/:id", async (req, res) => {
  try {
    const taxpayerData = await TaxPayer.findAll({
      where: { id: req.session.id },
    });
    res.status(200).json(taxpayerData);
  } catch (err) {
    res.status(200).json({ message: "Cannot find taxpayers" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const taxpayerData = await TaxPayer.findByPk(req.params.id);
    res.status(200).json(taxpayerData);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

module.exports = router;
