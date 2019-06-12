const db = require("../models");
// const passport = require("passport");

module.exports = {
  token: {
    post: async (req, res) => {
      let check = await db.firebase.findAll({
        attributes: ["token"]
      });
      console.log(check);
      res.status(201).send("POST /firebase/token OK!");
      // passport.authenticate("jwt", { session: false }, (err, user, info) => {
      //   db.firebase
      //     .create({
      //       token: req.body.fcmToken,
      //       user_id: user.dataValues._id
      //     })
      //     .then(() => res.status(201).send("POST /firebase/token OK!"));
      // })(req, res);
    }
  }
};
