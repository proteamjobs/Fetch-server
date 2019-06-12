const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const multer = require("multer");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const key = require("./config/config.json");
const key1 = key.S3_ACCESS_KET_ID;
const key2 = key.S3_SECRET_ACCESS_KEY;

AWS.config.update({
  accessKeyId: key1,
  secretAccessKey: key2
});
const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: "fetcher.fun",
    key(req, file, cb) {
      cb(null, `original/${+new Date()}${path.basename(file.originalname)}`);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1025 }
});

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const ordersRouter = require("./routes/orders");
const travelsRouter = require("./routes/travels");
const directmessagesRouter = require("./routes/directmessages");
const reviewsRouter = require("./routes/reviews");
const noticeRouter = require("./routes/notice");
const parcelsRouter = require("./routes/parcels");
const notificationsRouter = require("./routes/notifications");
const authRouter = require("./routes/auth");

// const fileUpload = require("express-fileupload");

let db = require("./models/index.js");

db.sequelize
  .sync()
  // .sync({ alter: true })
  // .sync({ force: true })
  .then(() => {
    console.log(" DB Connect!");
  })
  .catch(err => {
    console.log(" DB Not Connect!");
    console.log(err);
  });

const app = express();

require("./module/passport");

app.use(cors());

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());

app.post("/orders/create", upload.single("uploadedImage"), (req, res, next) => {
  // console.log("file ::: ", req.file);
  // console.log("body ::: ", req.body);
  console.log(req.headers);

  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    let temp = req.body;
    db.orders
      .create({
        name: temp.productName,
        destination: temp.destination,
        price: temp.price,
        due: temp.due,
        quantity: temp.quantity,
        preferParcel: temp.preferParcel,
        description: temp.description,
        referenceUrl: temp.referenceUrl,
        buyer_id: user.dataValues._id
      })
      .then(result => {
        db.productimgs.create({
          order_id: result.dataValues._id,
          imgUrl: req.file.location
        });
        let response = {
          success: true
        };
        res.status(201).send(JSON.stringify(response));
      })
      .catch(err => {
        let response = {
          success: false,
          error: err
        };
        res.status(400).send(JSON.stringify(response));
      });
  })(req, res, next);
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/orders", ordersRouter);
app.use("/travels", travelsRouter);
app.use("/directmessages", directmessagesRouter);
app.use("/reviews", reviewsRouter);
app.use("/notice", noticeRouter);
app.use("/parcels", parcelsRouter);
app.use("/notifications", notificationsRouter);
app.use("/auth", authRouter);

// const test = () => {
//   db.users.create({
//     email: "test3@gmail.com",
//     name: "test3",
//     provider: "fetcher",
//     password: "test1234"
//   });
// };

// const test2 = () => {
//   db.orders.create({
//     name: "유요한의 셔츠",
//     destination: "체코",
//     price: 60000000,
//     due: "2019-08-10",
//     quantity: 1,
//     preferParcel: true,
//     description: "체코에서 판다고 하네요. 급해요 !!!",
//     buyer_id: 4
//   });
// };

// const test3 = () => {
//   db.productimgs.create({
//     order_id: 8,
//     imgUrl: "http://server.fetcher.fun/image/yyh_s.jpg"
//   });
// };

// test();
// test2();
// test3();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listening to port ${PORT}...`));

module.exports = app;
