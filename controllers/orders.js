const db = require("../models");
const passport = require("passport");
const notification = require("../module/pushnotification");
// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");
// const AWS = require("aws-sdk");
// const multerS3 = require("multer-s3");
// const key = require("../config/config.json");
// const key1 = key.S3_ACCESS_KET_ID;
// const key2 = key.S3_SECRET_ACCESS_KEY;

// AWS.config.update({
//   accessKeyId: key1,
//   secretAccessKey: key2
// });
// const upload = multer({
//   storage: multerS3({
//     s3: new AWS.S3(),
//     bucket: "fetcher.fun",
//     key(req, file, cb) {
//       cb(null, `original/${+new Date()}${path.basename(file.originalname)}`);
//     }
//   }),
//   limits: { fileSize: 5 * 1024 * 1025 }
// });

// const upload = multer({ dest: "uploads/" });

module.exports = {
  list: {
    get: async (req, res) => {
      try {
        let order = {
          orderList: []
        };
        let list = await db.orders.findAll();
        list.map(item => {
          let temp = {
            order_id: item.dataValues._id,
            productName: item.dataValues.name,
            // imageUrl: "http://localhost:3001/public/image/gucci.jpg",
            destination: item.dataValues.destination,
            price: item.dataValues.price,
            due: item.dataValues.due,
            status: item.dataValues.status
          };
          order.orderList.push(temp);
        });

        for (let i = 0; i < order.orderList.length; i++) {
          let imgUrl = await db.productimgs.findOne({
            where: { order_id: order.orderList[i].order_id },
            attributes: ["imgUrl"]
          });
          order.orderList[i].imageUrl = imgUrl.imgUrl;
        }

        order.orderList.reverse();

        if (req.query.max) {
          order.orderList = order.orderList.splice(0, req.query.max);
          res.send(order);
        } else {
          res.send(order);
        }
      } catch (err) {
        console.log("ERROR ::: ", err);
      }

      // res.status(201).send("GET /orders/list OK!");
    }
  },
  detail: {
    get: async (req, res) => {
      try {
        let orderDetail = {
          requester: {}
        };
        let tempArr = [];

        let list = await db.orders.findOne({
          where: { _id: req.query.order_id }
        });

        let user = await db.users.findOne({
          where: {
            _id: list.dataValues.buyer_id
          }
        });

        let imageList = await db.productimgs.findAll({
          where: {
            order_id: list._id
          },
          attributes: ["imgUrl"]
        });

        for (let i = 0; i < imageList.length; i++) {
          tempArr.push(imageList[i].dataValues.imgUrl);
        }

        orderDetail.productName = list.dataValues.name;
        orderDetail.destination = list.dataValues.destination;
        orderDetail.price = list.dataValues.price;
        orderDetail.quantity = list.dataValues.quantity;
        orderDetail.referenceUrl = list.dataValues.referenceUrl;
        orderDetail.description = list.dataValues.description;
        orderDetail.requester.ID = user.dataValues._id;
        orderDetail.requester.imageUrl = user.dataValues.image;
        orderDetail.requester.name = user.dataValues.name;
        orderDetail.imageUrls = tempArr;

        res.status(200).send(orderDetail);
      } catch (err) {
        console.log("ERROR ::: ", err);
        res.status(400).send(err);
      }

      // res.status(200).send("GET /orders/detail OK!");
    }
  },
  create: {
    post: (req, res) => {
      let temp = req.body;
      console.log(temp);

      // db.orders
      //   .create({
      //     name: temp.productName,
      //     destination: temp.destination,
      //     price: temp.price,
      //     due: temp.due,
      //     quantity: temp.quantity,
      //     preferParcel: temp.preferParcel,
      //     description: temp.description,
      //     buyer_id: 3
      //   })
      //   .then(() => {
      //     res.status(201).send("POST /orders/create OK!");
      //   })
      //   .catch(err => {
      //     res.status(400).send(err);
      //     console.log(err);
      //   });
      res.status(201).send("POST /orders/create OK!");
    }
    // post: (req, res, next) => {
    //   upload.single("img")(req, res, next);
    //   // setTimeout(() => console.log(req.file), 5000);

    //   res.status(201).send("POST /orders/create OK!");
    // }
  },
  addapplier: {
    post: (req, res, next) => {
      passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err) {
          res.status(201).send({ success: false, error: err });
        }
        if (info !== undefined) {
          res.status(201).send({
            success: false,
            error: info
          });
        } else {
          // applies 테이블에 중복된 데이터가 있는지 확인하고 삽입한다.
          db.applies
            .findOrCreate({
              where: {
                traveler_id: user._id,
                order_id: req.body.order_id
              },
              defaults: {
                isPicked: false
              }
            })
            .then(async ([applies, created]) => {
              if (created) {
                // 기존에 데이터가 없는 것을 확인 후 상태를 response 한다.
                notification.addApplier(applies);
                res.status(201).send({ success: true });
              } else {
                // 기존에 데이터가 있는 것을 확인 후 에러와 함께 response 한다.
                res
                  .status(201)
                  .send({ success: false, error: "Already applies." });
              }
            })
            .catch(err => {
              res.status(201).send({ success: false, error: err });
            });
        }
      })(req, res, next);
    }
  },
  pickfetcher: {
    post: (req, res, next) => {
      passport.authenticate(
        "jwt",
        { session: false },
        async (err, user, info) => {
          if (err) {
            res.status(201).send(err);
          }
          if (info !== undefined) {
            res.status(201).send({
              success: false,
              error: info.message
            });
          } else {
            // 해당 order에 이미 매치가 완료됬는지 확인
            let isCheck = await db.applies
              .findAll({
                where: {
                  order_id: req.body.order_id,
                  isPicked: true
                }
              })
              .then(data => {
                if (data.length === 0) {
                  return true;
                }
                return false;
              });

            // 먼저 실제로 applies 테이블에 데이터가 있는지 조회한다.
            if (isCheck) {
              db.applies
                .findOne({
                  where: {
                    traveler_id: req.body.traveler_id,
                    order_id: req.body.order_id
                  }
                })
                .then(applies => {
                  if (applies) {
                    // 만일 해당 row의 isPicked가 false 이면 업데이트 후 상태를 response 한다.
                    if (!applies.dataValues.isPicked) {
                      db.applies
                        .update(
                          { isPicked: true },
                          {
                            where: {
                              traveler_id: req.body.traveler_id,
                              order_id: req.body.order_id
                            }
                          }
                        )
                        .then(() => {
                          res.status(201).send({ success: true });
                        })
                        .catch(err => {
                          res.status(201).send({ success: false, error: err });
                        });
                      notification.pickFetcher(applies);
                    } else {
                      // 만약 해당 row의 isPicked가 true이면 에러와 함께 response 한다.
                      res.status(201).send({
                        success: false,
                        error: "ERROR :: Already isPicked is True!"
                      });
                    }
                  } else {
                    // applies 테이블에 존재하지 않을 겅우 에러와 함께 response 한다.
                    res.status(201).send({
                      success: false,
                      error: "ERROR :: Don't have applies!"
                    });
                  }
                });
            } else {
              res.status(201).send({
                success: false,
                error: "ERROR :: This order is already picked!"
              });
            }
          }
        }
      )(req, res, next);
    }
  },
  applierlist: {
    get: (req, res, next) => {
      passport.authenticate(
        "jwt",
        { session: false },
        async (err, user, info) => {
          if (err) {
            res.status(200).send(err);
          }
          if (info !== undefined) {
            res.status(200).send({
              success: false,
              error: info.message
            });
          } else {
            let responseData = {
              applierlist: []
            };
            let temp = await db.applies
              .findAll({
                where: {
                  order_id: req.query.order_id
                }
              })
              .then(data => {
                return data;
              })
              .catch(err => {
                res.status(200).send(err);
              });

            let tempArray = temp.map(data => {
              return db.users
                .findOne({ where: { _id: data.traveler_id } })
                .then(async item => {
                  return {
                    traveler_id: item._id,
                    travelerName: item.name,
                    travelerImageUrl: item.image
                  };
                });
            });

            await Promise.all(tempArray).then(data => {
              data.forEach(item => {
                responseData.applierlist.push(item);
              });
            });
            res.status(200).send(responseData);
          }
        }
      )(req, res, next);
    }
  }
};
