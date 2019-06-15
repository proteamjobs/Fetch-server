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
    get: (req, res, next) => {
      passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err) {
          res.status(201).send(err);
        }
        if (info !== undefined) {
          res.status(201).send(info.message);
        } else {
          db.travels
            .findAll({
              where: {
                traveler_id: user._id
              }
            })
            .then(travel => {
              let responseData = {
                travellist: []
              };

              travel.forEach(data => {
                let tempArray = {
                  destination: data.destination,
                  departingDate: data.departureDate,
                  arrivingDate: data.arrivalDate
                };

                responseData.travellist.push(tempArray);
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
  orderlist: {
    get: (req, res, next) => {
      passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err) {
          res.status(201).send(err);
        }
        if (info !== undefined) {
          res.status(201).send(info.message);
        } else {
          // 로그인 된 계정이 등록했던 주문 내역을 조회한다.
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
                // order_id에 대한 이미지를 받아온다.
                let image = await db.productimgs.findAll({
                  where: {
                    order_id: item._id
                  }
                });

                // order_id에 대해 주문자로 부터 선택 받은 유저의 정보를 받아온다.
                let fetcher = await db.applies.findOne({
                  where: {
                    order_id: item._id,
                    isPicked: true
                  },
                  attributes: ["traveler_id"]
                });

                // 아직 선택받지 못한 주문의 fetcher_id는 0으로 지정한다.
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
                  imageUrl: image[0].dataValues.imgUrl,
                  fetcher_id: fetcher_id
                };

                return insertItem;
              });

              // 반환된 promise 데이터를 풀어내면서 responseData에 push한다.
              await Promise.all(tempListData).then(list => {
                list.forEach(data => {
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
    get: (req, res, next) => {
      passport.authenticate(
        "jwt",
        { session: false },
        async (err, user, info) => {
          if (err) {
            res.status(201).send(err);
          }
          if (info !== undefined) {
            res.status(201).send(info.message);
          } else {
            // 로그인 된 계정이 지원했었던 order_id를 배열로 받아온다.
            let orderList = await db.applies
              .findAll({
                where: {
                  traveler_id: user._id
                },
                attributes: ["order_id"]
              })
              .then(item => {
                let tempArray = item.map(data => {
                  return data.dataValues.order_id;
                });
                return tempArray;
              });

            let responseData = {
              applylist: []
            };

            // TODO Add parcelStatus
            let getList = orderList.map(async data => {
              return await db.orders
                .findOne({
                  where: {
                    _id: data
                  }
                })
                .then(async list => {
                  // order_id에 대한 이미지를 받아온다.
                  let image = await db.productimgs.findAll({
                    where: {
                      order_id: list._id
                    }
                  });

                  let returnData = {
                    order_id: list._id,
                    productName: list.name,
                    destination: list.destination,
                    price: list.price,
                    due: list.due,
                    status: list.status,
                    imageUrl: image[0].dataValues.imgUrl
                  };

                  return returnData;
                });
            });

            // 반환된 promise 데이터를 풀어내면서 responseData에 push한다.
            await Promise.all(getList).then(list => {
              list.forEach(data => {
                responseData.applylist.push(data);
              });
            });
            res.status(201).send(responseData);
          }
        }
      )(req, res, next);
    }
  }
};

// ------------- /users/orderlist -----------
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

// ------------- /users/applylist -----------
// {
//   applylist: [ {
//     order_id: Number,
//     productName: String,
//     destination: String,
//     price: Number,
//     due: String,
//     status: String,
//     imageUrl: String,
//     parcelStatus: Boolean
//   } ]
// }

// { _id: 10,
//   name: '초코칩 쿠키',
//   destination: '베트남',
//   price: 13000,
//   due: '2019-07-02',
//   quantity: 10,
//   preferParcel: true,
//   description: '베트남에서 파는 초코칩 쿠키가 그렇게 맛나다면서요? 꼭 먹어보고 싶어요 사다주세요 빨리요 현기증나요',
//   referenceUrl: null,
//   buyer_id: 3,
//   status: 0,
//   parcel_id: null
// }
