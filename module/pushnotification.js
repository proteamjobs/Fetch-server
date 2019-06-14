const db = require("../models");
const admin = require("firebase-admin");
const serviceAccount = require("../config/fetch-notifications-server-firebase-adminsdk-701al-255874869a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fetch-notifications-server.firebaseio.com"
});

module.exports = {
  addApplier: async applies => {
    let user = await db.users.findOne({
      where: { _id: applies.dataValues.traveler_id }
    });
    let order = await db.orders.findOne({
      where: { _id: applies.dataValues.order_id }
    });
    let token = await db.firebase.findAll({
      where: { user_id: order.dataValues.buyer_id }
    });

    let text = user.dataValues.name + "님이 지원요청을 하였습니다.";
    db.notices
      .create({
        title: "지원요청",
        message: text
      })
      .then(result => {
        console.log(result);
        db.notifications.create({
          to_id: order.dataValues.buyer_id,
          from_id: applies.dataValues.traveler_id,
          status: 1,
          order_id: applies.dataValues.order_id,
          notice_id: result.dataValues._id
        });
      });
    for (let i = 0; i < token.length; i++) {
      let message = {
        notification: {
          title: "지원요청",
          body: text
        },
        data: {
          status: "1",
          status_id: applies.dataValues.order_id.toString()
        },
        token: token[i].dataValues.token
      };

      admin
        .messaging()
        .send(message)
        .then(response => {
          // Response is a message ID string.
          console.log("Successfully sent message:", response);
          // res.send(response);
        })
        .catch(error => {
          console.log("Error sending message:", error);
        });
    }
  },
  pickFetcher: async applies => {
    // console.log(applies);
    let order = await db.orders.findOne({
      where: { _id: applies.dataValues.order_id }
    });
    // console.log(order);
    let user = await db.users.findOne({
      where: { _id: order.dataValues.buyer_id }
    });
    let token = await db.firebase.findOne({
      where: { user_id: applies.dataValues.traveler_id }
    });
    let text =
      user.dataValues.name +
      "님이 지원요청을 수락하여 Fetcher로 선택되었습니다.";
    let message = {
      notification: {
        title: "지원요청수락",
        body: text
      },
      data: {
        status: "1",
        status_id: applies.dataValues.order_id.toString()
      },
      token: token.dataValues.token
    };

    admin
      .messaging()
      .send(message)
      .then(response => {
        // Response is a message ID string.
        console.log("Successfully sent message:", response);
        // res.send(response);
      })
      .catch(error => {
        console.log("Error sending message:", error);
      });
  }
};
