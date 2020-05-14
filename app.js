import express from "express";
import createError from "http-errors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import db from "./models/index";
import groupRoutes from "./routes/groupRoutes";
import userRoutes from "./routes/userRoutes";
import notifRoutes from "./routes/notifRoutes";
import taskRoutes from "./routes/taskRoutes";
import clubRoutes from "./routes/clubRoutes";
import trainingRoutes from "./routes/trainingRoutes";
import attendanceRoutes from "./routes/attendanceRoutes";

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// set middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// set app routes
groupRoutes(app);
userRoutes(app);
taskRoutes(app);
notifRoutes(app);
clubRoutes(app);
trainingRoutes(app);
attendanceRoutes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// do the db migrations
// doing them manually with sequelize-cli
// db.sequelize.sync();

app.listen(3030, () => console.log("Server listening on port 3030"));

export default app;
