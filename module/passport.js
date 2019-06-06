const BCRIPT_SALT_ROUNDS = 12;
const jwtSecret = require("../config/jwtConfig");
const db = require("../models");
const bcrypt = require("bcrypt");
const GOOGLE_KEY = require("../config/config").google.web;
const passport = require("passport"),
  localStrategy = require("passport-local").Strategy,
  JWTstrategy = require("passport-jwt").Strategy,
  ExtractJWT = require("passport-jwt").ExtractJwt,
  GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_KEY.client_id,
      clientSecret: GOOGLE_KEY.client_secret,
      callbackURL: GOOGLE_KEY.redirect_uris[1],
      passReqToCallback: true
    },
    (req, ccessToken, refreshToken, profile, email, done) => {
      db.users
        .findOne({
          where: {
            google_id: email.id
          }
        })
        .then(user => {
          if (!user) {
            console.log("Don't have user!");
            return done(null, email);
          } else {
            console.log("We have user!");
            return done(null, false);
          }
        });
    }
  )
);

passport.use(
  "register",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
      session: false
    },
    (req, email, password, done) => {
      console.log("0 req.body :: ", req.body);
      try {
        db.users
          .findOne({
            where: {
              email: email
            }
          })
          .then(user => {
            if (user !== null) {
              return done(null, false, { message: "This user is already!" });
            } else {
              bcrypt.hash(password, BCRIPT_SALT_ROUNDS).then(hashedPassword => {
                console.log("1 req.body :: ", req.body);
                if (req.body.provider === "google") {
                  console.log("2 req.body :: ", req.body);
                  db.users
                    .create({
                      email: email,
                      name: req.body.name,
                      provider: req.body.provider,
                      google_id: req.body.socialId,
                      image: req.body.imageURL
                    })
                    .then(user => {
                      return done(null, user);
                    });
                } else {
                  db.users
                    .create({
                      email: email,
                      password: hashedPassword,
                      name: req.body.name,
                      provider: "fetcher"
                    })
                    .then(user => {
                      return done(null, user);
                    });
                }
              });
            }
          });
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false
    },
    (email, password, done) => {
      try {
        db.users
          .findOne({
            where: {
              email: email
            }
          })
          .then(user => {
            if (user === null) {
              return done(null, false, { message: "bad email" });
            } else {
              bcrypt.compare(password, user.password).then(response => {
                if (response !== true) {
                  return done(null, false, {
                    message: "Passwords do not match!"
                  });
                }
                return done(null, user);
              });
            }
          });
      } catch (err) {
        done(err);
      }
    }
  )
);

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
  secretOrKey: jwtSecret.secret
};
passport.use(
  "jwt",
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      db.users
        .findOne({
          where: {
            email: jwt_payload.email
          }
        })
        .then(user => {
          if (user) {
            done(null, user);
          } else {
            done(null, false, { message: "User not found in DB!" });
          }
        });
    } catch (err) {
      done(err);
    }
  })
);
