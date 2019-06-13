const db = require("../models");
const passport = require("passport");

module.exports = {
  list: {
    get: async (req, res) => {
      passport.authenticate(
        "jwt",
        { session: false },
        async (err, user, info) => {
          // console.log(user);
          let response = {
            notiList: []
          };
          let notificationList = await db.notifications.findAll({
            where: { to_id: user.dataValues._id }
          });
          // let noticeList = await db.notices.findAll();
          // console.log(notificationList);
          // console.log(noticeList);
          for (let i = 0; i < notificationList.length; i++) {
            let temp = {
              from: {},
              notice: {},
              status: {}
            };
            let user = await db.users.findOne({
              where: { _id: notificationList[i].dataValues.from_id }
            });
            let notice = await db.notices.findOne({
              where: { _id: notificationList[i].dataValues.notice_id }
            });
            // console.log(user);
            // console.log(notice);
            temp.from.id = notificationList[i].dataValues.from_id;
            temp.from.name = user.dataValues.name;
            temp.from.imageUrl = user.dataValues.image;
            temp.notice.title = notice.dataValues.title;
            temp.notice.message = notice.dataValues.message;
            temp.status.status = notificationList[i].dataValues.status;
            temp.status.status_id = notificationList[i].dataValues.order_id;

            // console.log(temp);
            response.notiList.push(temp);
            response.success = true;
          }
          console.log(response);
          res.status(200).send(response);
        }
      )(req, res);
      // res.status(201).send("GET /notifications/list OK!");
    }
  }
};
