// IMPORTS
const express = require("express");
const {
  insertNotification,
  getAllNotifications,
  deleteNotification,
  deleteAllNotifications,
} = require("../../utilities/database");
const auth = require("../../utilities/auth");
const router = express.Router();

// ROUTES
router.post("/new", (req, res, next) => {
  const { notification_id, is_read, content, url } = req.body;
  const { user_id: userId } = req.user;
  insertNotification(notification_id, is_read, content, url, userId)
    .then(() => {
      res.status(200);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
      next(error);
    });
});

router.get(
  "/all",
  auth.authenticate("local", { session: false }),
  (req, res) => {
    const { user_id: userId } = req.user;
    getAllNotifications(userId)
      .then(() => {
        res.status(200);
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  }
);

router.delete(
  "/id/:id",
  auth.authenticate("local", { session: false }),
  (req, res) => {
    const { id } = req.params;
    const { user_id: userId } = req.user;
    deleteNotification(id, userId)
      .then((response) => {
        if (response !== null) {
          res.status(200);
        } else {
          res
            .status(204)
            .send(
              "Either you are trying to delete a notification that belongs to a different user, or you gave an invalid notification_id, or the notification does not exist."
            );
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  }
);

router.delete(
  "/all",
  auth.authenticate("local", { session: false }),
  (req, res) => {
    const { user_id: userId } = req.user;
    deleteAllNotifications(userId)
      .then((response) => {
        if (response !== null) {
          res.status(200);
        } else {
          res.status(204).send("No notifications available to delete");
        }
      })
      .catch((error) => {
        res.sendStatus(500);
        res.json({ message: error.message });
      });
  }
);

module.exports = router;
