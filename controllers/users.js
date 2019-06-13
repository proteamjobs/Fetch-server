const passport = require("passport");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../config/jwtConfig");
const db = require("../models");

module.exports = {
  info: {
    get: async (req, res, next) => {
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
          console.log("User found in DB!");

          // {
          //   success: Boolean,
          //   userInfo: {
          //     email: String,
          //     stars: Number,
          //     name: String,
          //     imageUrl: String,
          //     reviewList: [ {
          //       to: String,
          //       from: String
          //       stars: Number,
          //       message: String,
          //       date: String
          //     } ]
          //   }
          // }

          // TODO stars, reviewList 관련 내용 추가 필요
          let responseData = {
            success: true,
            userInfo: {
              email: user.email,
              name: user.name,
              imageUrl: user.image
            }
          };
          res.status(200).send(responseData);
        }
      })(req, res, next);
    }
  },
  signin: {
    post: (req, res, next) => {
      passport.authenticate("login", (err, user, info) => {
        if (err) {
          console.log("ERROR /users/signin : ", err);
        }

        if (info !== undefined) {
          let responseData = {
            success: false,
            error: info.message
          };
          res.status(201).send(responseData);
        } else {
          req.logIn(user, err => {
            // Sequlize DB Serch
            db.users
              .findOne({
                where: {
                  email: user.email
                }
              })
              .then(user => {
                // Make JWT
                const token = jwt.sign(
                  { email: user.email, name: user.name, image: user.image },
                  jwtSecret.secret
                );
                res.status(201).send({
                  success: true,
                  token: token,
                  userDB_id: user._id,
                  userDB_name: user.name,
                  userDB_image: user.image,
                  userDB_provider: user.provider
                });
              });
          });
        }
      })(req, res, next);
    }
  },
  deleteaccount: {
    delete: (req, res, next) => {
      passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err) {
          console.log("ERROR /users/deleteaccount : ", err);
        }
        if (info !== undefined) {
          res.status(201).send({
            success: false
          });
        } else {
          db.users
            .destroy({ where: { _id: user._id } })
            .then(() => {
              res.status(201).send({ success: true });
            })
            .catch(err => {
              res.status(201).send({ success: false, err: err });
            });
        }
      })(req, res, next);
    }
  },
  register: {
    post: (req, res, next) => {
      passport.authenticate("register", (err, user, info) => {
        if (err) {
          res.status(201).send("ERROR /users/signin : ", err);
        }

        if (info !== undefined) {
          res.status(201).send({
            success: false,
            message: info.message
          });
        } else {
          req.logIn(user, err => {
            res.status(201).send({
              success: true
            });
          });
        }
      })(req, res, next);
    }
  },
  checkemail: {
    get: (req, res) => {
      db.users
        .findOne({
          where: {
            email: req.query.email
          }
        })
        .then(user => {
          if (!user) {
            res.status(200).send({ exist: false });
          } else {
            res.status(200).send({ exist: true });
          }
        });
    }
  },
  signout: {
    get: (req, res) => {
      req.logout();
      res.status(200).send({ success: true });
    }
  },
  changeprofile: {
    update: (req, res) => {
      res.status(201).send("UPDATE users/changeprofile OK!");
    }
  },
  travellist: {
    get: (req, res) => {
      res.status(201).send("GET users/travellist OK!");
    }
  },
  orderlist: {
    get: (req, res, next) => {
      passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err) {
          res.status(201).send(err);
        }
        if (info !== undefined) {
          res.status(201).send(info.message);
        } else {
          db.orders
            .findAll({
              where: {
                buyer_id: user._id
              }
            })
            .then(async orderList => {
              let responseData = {
                orderlist: []
              };

              let tempListData = orderList.map(async item => {
                let image = await db.productimgs.findAll({
                  where: {
                    order_id: item._id
                  }
                });

                let fetcher = await db.applies.findOne({
                  where: {
                    order_id: item._id,
                    isPicked: true
                  },
                  attributes: ["traveler_id"]
                });

                let fetcher_id = 0;
                if (fetcher !== null) {
                  fetcher_id = fetcher.dataValues.traveler_id;
                }

                // TODO Add parcelStatus
                let insertItem = {
                  order_id: item._id,
                  productName: item.name,
                  destination: item.destination,
                  price: item.price,
                  due: item.due,
                  status: item.status,
                  imgUrl: image[0].dataValues.imgUrl,
                  fetcher_id: fetcher_id
                };

                return insertItem;

                //   {
                //     "_id": 33, -> order_id
                //     "name": "테스트", -> productName
                //     "destination": "일본", -> destination
                //     "price": 3000, -> price
                //     "due": "2019. 9. 14", -> due
                //     "quantity": 1,
                //     "preferParcel": false,
                //     "description": "테스트입니다",
                //     "referenceUrl": null,
                //     "buyer_id": 78,
                //     "status": 0,
                //     "parcel_id": null,
                // }

                // {
                //   orderlist: [ {
                //     order_id: Number, @@
                //     productName: String, @@
                //     destination: String, @@
                //     price: Number, @@
                //     due: String, @@
                //     status: String, @@
                //     imageUrl: String,  @@     ## order_id -> image table
                //     fetcher_id: Number,     ## applies table -> isPicked true
                //     parcelStatus: Boolean    ## parcer_id
                //   } ]
                // }
              });

              await Promise.all(tempListData).then(list => {
                list.map(data => {
                  responseData.orderlist.push(data);
                });
              });
              res.status(201).send(responseData);
            })
            .catch(err => {
              res.status(201).send(err);
            });
        }
      })(req, res, next);
    }
  },
  applylist: {
    get: (req, res) => {
      res.status(201).send("GET users/applylist OK!");
    }
  }
};
