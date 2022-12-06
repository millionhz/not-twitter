const express = require("express");
const {
  getUserById,
  getUserDataById,
  deactivateUserAccount,
  activateUserAccount,
  checkIfAccountActivated,
} = require("../../utilities/database");
const router = express.Router();

/*
this patch route lets admin deactivate accounts.
first it gets searches a user by id and sets its is_activated flag
to 0 if it is 1.
    > (req, res, next) or (req, res)
    > add the logic of checking if the account is already deactivated.
    > if so, respond with 200 
*/
router.patch("/users/deactivate/:userId", (req, res) => {
  const { userId } = req.params;
  const { user_id: myUserId } = req.user;
  // we have the user by id now and now execute the relevant query
  checkIfAccountActivated(userId)
    .then((data) => {
        // this means that the account is 
      if (data === null) {
        getUserDataById(userId, myUserId)
          .then((data) => {
            if (data) {
              deactivateUserAccount(userId)
                .then(() => {
                  res.sendStatus(200);
                })
                .catch((err) => {
                  res.status(500).json({ message: err.message });
                });
            } else {
              res.sendStatus(404); // not found
            }
          })
          .catch((err) => {
            res.status(500).json({ message: err.message });
          });
      } else {
        res.status(204).json({ message: "Account Already Deactivated" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

/*
this patch route lets admin activate user accounts.
*/
router.patch("/users/activate/:userId", (req, res) => {
  const { userId } = req.params;
  const { user_id: myUserId } = req.user;
  checkIfAccountActivated(userId)
    .then((data) => {
      if (data) {
        getUserDataById(userId, myUserId)
          .then((data) => {
            if (data) {
              activateUserAccount(userId)
                .then(() => {
                  res.sendStatus(200);
                })
                .catch((err) => {
                  res.status(500).json({ message: err.message });
                });
            }
          })
          .catch((err) => {
            res.status(500).json({ message: err.message });
          });
      } else {
        res.sendStatus(400);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});
