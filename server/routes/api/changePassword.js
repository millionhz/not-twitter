const express = require("express");
const { updatePassword } = require("../../utilities/database");
const auth = require("../../utilities/auth");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Update Password" });
});

router.patch(
  "/",
  auth.authenticate("local", { session: false }),
  (req, res) => {
    const { email, password, new_password } = req.body;
    updatePassword(email, new_password)
      .then(() => {
        res.status(200);
      })
      .catch((error) => res.status(500).send({ message: error.message }));
  }
);

module.exports = router;
