const db = require("../models");

module.exports = {
  list: {
    get: async (req, res) => {
      console.log(req.query);
      let orderList = {
        orderList: []
      };
      try {
        let test = await db.orders.findAll();
        // console.log(test);
        test.map(item => {
          // orderList.orderList.push(item)
          // console.log(item.dataValues);
          let temp = {
            order_id: item.dataValues._id,
            productName: item.dataValues.name,
            imageUrl:
              "https://image.fmkorea.com/files/attach/images/4180795/534/788/062/b5857298727c13789b3cdd9cc365ceef.jpg",
            destination: item.dataValues.destination,
            price: item.dataValues.price,
            due: item.dataValues.due,
            status: item.dataValues.status
          };
          orderList.orderList.push(temp);
        });
        console.log(orderList.orderList);
        res.send(orderList.orderList);
      } catch (err) {
        console.log("ERROR ::: ", err);
      }

      // res.status(201).send("GET /orders/list OK!");
    }
  },
  detail: {
    get: (req, res) => {
      res.status(201).send("GET /orders/detail OK!");
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
