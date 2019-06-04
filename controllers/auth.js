const passport = require("passport");
// const jwt = require("jsonwebtoken");
// const jwtSecret = require("../config/jwtConfig");
// const db = require("../models");

module.exports = {
  google: {
    get: (req, res, next) => {
      passport.authenticate("google", {
        scope: ["profile", "email"],
        session: false
      })(req, res, next);
    },
    callback: {
      get: (req, res, next) => {
        // console.log(req.body);
        passport.authenticate(
          "google",
          {
            session: false
          },
          (err, email, info) => {
            // res.redirect("/auth");
            console.log(email);
            console.log("/google/callback");
          }
        )(req, res, next);
      }
    }
  },
  facebook: {
    get: (req, res) => {
      res.status(201).send("GET users/facebook OK!");
    }
  },
  check: {
    get: (req, res, next) => {
      passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err) {
          console.log("ERROR /users/info : ", err);
        }
        if (info !== undefined) {
          let responseData = {
            success: false,
            message: info.message
          };
          res.status(200).send(responseData);
        } else {
          res.status(200).send(user);
        }
      })(req, res, next);
    }
  }
};

// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// // GET /auth/google/callback
// //   Use passport.authenticate() as route middleware to authenticate the
// //   request.  If authentication fails, the user will be redirected back to the
// //   login page.  Otherwise, the primary route function function will be called,
// //   which, in this example, will redirect the user to the home page.
// app.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });
