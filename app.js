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

const app = express();
app.use(cors());

app.use(logger("dev"));
// app.use(express.json());
app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: false }));
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listening to port ${PORT}...`));

module.exports = app;
