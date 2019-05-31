const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const ordersRouter = require("./routes/orders");
const travelsRouter = require("./routes/travels");
const directmessagesRouter = require("./routes/directmessages");
const reviewsRouter = require("./routes/reviews");
const noticeRouter = require("./routes/notice");
const parcelsRouter = require("./routes/parcels");
const notificationsRouter = require("./routes/notifications");

let db = require("./models/index.js");

db.sequelize
  .sync()
  //   .sync({ force: true })
  .then(() => {
    console.log(" DB Connect!");
  })
  .catch(err => {
    console.log(" DB Not Connect!");
    console.log(err);
  });

const app = express();
app.use(cors());

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/orders", ordersRouter);
app.use("/travels", travelsRouter);
app.use("/directmessages", directmessagesRouter);
app.use("/reviews", reviewsRouter);
app.use("/notice", noticeRouter);
app.use("/parcels", parcelsRouter);
app.use("/notifications", notificationsRouter);

// const test = () => {
//   db.users.create({
//     email: "test3@gmail.com",
//     name: "test3",
//     provider: "fetcher",
//     password: "test1234"
//   });
// };

// test();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listening to port ${PORT}...`));

module.exports = app;
