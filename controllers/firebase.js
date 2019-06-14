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
        res.status(201).send(response);
      }
    }
  },
  delete: {
    delete: async (req, res) => {
      console.log(req.body);
      // res.send("OK");
      let token = await db.firebase.findOne({
        where: { token: req.body.fcmToken }
      });
      console.log(token);
      if (token !== null) {
        db.firebase
          .destroy({
            where: { token: req.body.fcmToken }
          })
          .then(() => {
            let response = {
              success: true
            };
            res.status(201).send(response);
          })
          .catch(err => {
            console.log(err);
            res.status(201).send(err);
          });
      } else {
        let response = {
          success: false
        };
        res.status(400).send(response);
      }
    }
  }
};
