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
    const { user_id, password } = req.body;
    updatePassword(user_id, password)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  }
);

module.exports = router;
