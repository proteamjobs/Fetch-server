const db = require("../models");
module.exports = {
  addReview: {
    post: async (req, res) => {
      // {
      //   buyer_id: Number,
      //   fetcher_id: Number,
      //   order_id: Number,
      //   star: Number,
      //   message: String
      // }
      // console.log(req.body);

      // db.reviews
      //   .create({
      //     buyer_id: req.body.buyer_id,
      //     fetcher_id: req.body.fetcher_id,
      //     order_id: req.body.order_id,
      //     star: req.body.star,
      //     message: req.body.message
      //   })
      //   .then(() => {
      //     res.status(201).send({ success: true });
      //   })
      //   .catch(err => {
      //     res.status(201).send({ success: false, error: err });
      //   });

      // db.orders
      //   .findOne({
      //     where: {
      //       _id: req.body.order_id
      //     }
      //   })
      //   .then(order => {
      //     console.log(order.dataValues.buyer_id);
      //     res.send(order);
      //   })
      //   .catch(err => {
      //     res.send("ERR :: ", err);
      //   });
      try {
        let getOrder = await db.orders.findOne({
          where: {
            _id: req.body.order_id
          }
        });

        if (getOrder) {
          let getFetcher = await db.applies.findOne({
            where: {
              order_id: req.body.order_id,
              isPicked: true
            }
          });

          if (getFetcher) {
            let buyer_id = getOrder.dataValues.buyer_id;
            let fetcher_id = getFetcher.dataValues.traveler_id;

            console.log(buyer_id, fetcher_id, req.body.order_id);
          }
        }
        res.status(201).send("aa");
      } catch (err) {
        res.status(201).send(err);
      }

      // console.log(getOrder.dataValues.buyer_id);

      // res.send("test");
    }
  }
};
