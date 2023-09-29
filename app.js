const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const http = require("node:http");
const path = require("node:path");
const cookieParser = require("cookie-parser");
const moment = require("moment");

//internal imports
const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter");

//internal imports
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");

const app = express();
const server = http.createServer(app);
dotenv.config();

//socket creation
const io = require("socket.io", server);
global.io = io;

//set comment as app locals
app.locals.moment = moment;

//database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => console.log("database connecting successfully!"))
  .catch((err) => console.log(err));

//request process
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set view engine
app.set("view engine", "ejs");

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//parser cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

//routing setup
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

//error handling
app.use(notFoundHandler);

//common error handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`app listen to port ${process.env.PORT}`);
});
