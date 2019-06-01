const db = require("../models");
// const fs = require("fs");
// const path = require("path");

module.exports = {
  list: {
    get: async (req, res) => {
      try {
        let tempObj = {
          tempArr: []
        };
        let test = await db.orders.findAll();
        test.map(item => {
          let temp = {
            order_id: item.dataValues._id,
            productName: item.dataValues.name,
            // imageUrl: "http://localhost:3001/public/image/gucci.jpg",
            destination: item.dataValues.destination,
            price: item.dataValues.price,
            due: item.dataValues.due,
            status: item.dataValues.status
          };
          tempObj.tempArr.push(temp);
        });

        for (let i = 0; i < tempObj.tempArr.length; i++) {
          let imgUrl = await db.productimgs.findOne({
            where: { order_id: tempObj.tempArr[i].order_id },
            attributes: ["imgUrl"]
          });
          tempObj.tempArr[i].imageUrl = imgUrl.imgUrl;
        }

        tempObj.tempArr.reverse();

        if (req.query.max) {
          let orderList = {
            orderList: []
          };
          for (let i = 0; i < req.query.max; i++) {
            orderList.orderList.push(tempObj.tempArr[i]);
          }
          res.send(orderList);
        } else {
          res.send(tempObj);
        }
      } catch (err) {
        console.log("ERROR ::: ", err);
      }

      // res.status(201).send("GET /orders/list OK!");
    }
  },
  detail: {
    get: (req, res) => {
      res.status(200).send("GET /orders/detail OK!");
    }
  },
  create: {
    post: (req, res) => {
      res.status(201).send("POST /orders/create OK!");
    }
  },
  addapplier: {
    post: (req, res) => {
      res.status(201).send("POST /orders/addapplier OK!");
    }
  },
  pickfetcher: {
    post: (req, res) => {
      res.status(201).send("POST /orders/pickfetcher OK!");
    }
  }
};
