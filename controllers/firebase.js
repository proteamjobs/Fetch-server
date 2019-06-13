const db = require("../models");
const passport = require("passport");

module.exports = {
  token: {
    post: async (req, res) => {
      let firebaseList = await db.firebase.findAll({
        attributes: ["token"]
      });

      let isCheck = true;

      for (let i = 0; i < firebaseList.length; i++) {
        if (firebaseList[i].dataValues.token === req.body.fcmToken) {
          isCheck = false;
        }
      }

      if (isCheck) {
        passport.authenticate("jwt", { session: false }, (err, user, info) => {
          db.firebase
            .create({
              token: req.body.fcmToken,
              user_id: user.dataValues._id
            })
            .then(() => {
              let response = {
                success: true
              };
              res.status(201).send(response);
            });
        })(req, res);
      } else {
        let response = {
          success: false
        };
        res.status(400).send(response);
      }
    }
  }
};
