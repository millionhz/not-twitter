const express = require("express");
const { insertUser } = require("../../utilities/database");
const { hasAllFields, constraints } = require("../../utilities/hasAllFields");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Sign up" });
});

router.post("/", (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validInput = hasAllFields(
      {
        name: constraints.name,
        email: constraints.email,
        password: constraints.password,
        dob: constraints.dob,
      },
      req.body
    );
    if (validInput !== true) {
      res.status(400).send(validInput);
    } else {
      insertUser(email, password)
        .then(() => {
          res.sendStatus(200);
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
          next(err);
        });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
