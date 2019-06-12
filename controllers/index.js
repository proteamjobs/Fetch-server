const users = require("./users");
const orders = require("./orders");
const travels = require("./travels");
const directmessages = require("./directmessages");
const reviews = require("./reviews");
const notice = require("./notice");
const notifications = require("./notifications");
const parcels = require("./parcels");
const auth = require("./auth");
const firebase = require("./firebase");

module.exports = {
  auth,
  users,
  orders,
  travels,
  directmessages,
  reviews,
  notice,
  parcels,
  notifications,
  firebase
};
