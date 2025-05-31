import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import logger from "./config/winston";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import RateLimitError from "express-rate-limit";
import http from "http";
import passport from "passport";
import { Server } from "socket.io";

import connectDB from "./config/connectDB";
import clinicRouter from "./routes/clinicRoutes";
import doctorRouter from "./routes/doctorRoutes";
import authRouter from "./routes/authRouters";
import patientRouter from "./routes/patientRouters";
import historyRouter from "./routes/historyRouters";
import extraoralRouter from "./routes/extraoralRouters";
import intraoralRouter from "./routes/intraoralRouters";
import radiographyRouter from "./routes/radiographyRouters";
import diagnosisAndTreatmentRouter from "./routes/diagnosisAndTreatmentRouters";
import listOfIssueRouter from "./routes/listOfIssueRouters";
import treatmentPlanRouter from "./routes/treatmentPlanRouters";
import treatmentHistoryRouter from "./routes/treatmentHistoryRouters";
import sharePatientRouter from "./routes/sharePatientRouters";
import libraryImagePatientRouter from "./routes/libraryImagePatientRouters";
import roomOfClinicRouter from "./routes/roomOfClinicRouters";
import servicesOfClinicRouter from "./routes/servicesOfClinicRouters";
import statusOfClinicRouter from "./routes/statusOfClinicRouters";
import scheduleRouter from "./routes/scheduleRouters";
import encryptionRouter from "./routes/encryptionRouters";
import discussionServices from "./services/discussionServices";
import lateralCephRouter from "./routes/lateralCephRouters";
import activityHistoryRouters from "./routes/activityHistoryRouters";

const app = express();
app.use(passport.initialize());

app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' ? '*' : process.env.BASE_URL_CLIENT,
    allowedHeaders: ["Content-Type", "Authorization", "token"],
    exposedHeaders: ["X-Total-Count", "token"],
  })
);

app.use(cookieParser());

app.use(helmet());
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 500, // limit each IP to 500 requests per windowMs
  legacyHeaders: true,
  message: "Too many requests from this IP, please try again in 5 minutes",
});

app.use(limiter);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(morgan("dev", { stream: logger.app.stream.write }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Root route for health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'UTEceph backend is running!' });
});

// router setup
app.use("/v1/clinic", clinicRouter);
app.use("/v1/doctor", doctorRouter);
app.use("/v1/auth", authRouter);
app.use("/v1/patient", patientRouter);
app.use("/v1/history", historyRouter);
app.use("/v1/extraoral", extraoralRouter);
app.use("/v1/intraoral", intraoralRouter);
app.use("/v1/radiography", radiographyRouter);
app.use("/v1/diagnosis", diagnosisAndTreatmentRouter);
app.use("/v1/listOfIssue", listOfIssueRouter);
app.use("/v1/treatmentPlan", treatmentPlanRouter);
app.use("/v1/treatmentHistory", treatmentHistoryRouter);
app.use("/v1/sharePatient", sharePatientRouter);
app.use("/v1/libraryImagePatient", libraryImagePatientRouter);
app.use("/v1/roomOfClinic", roomOfClinicRouter);
app.use("/v1/servicesOfClinic", servicesOfClinicRouter);
app.use("/v1/statusOfClinic", statusOfClinicRouter);
app.use("/v1/schedule", scheduleRouter);
app.use("/v1/encryption", encryptionRouter);
app.use("/v1/lateralCeph", lateralCephRouter);
app.use("/v1/activityHistory", activityHistoryRouters);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // if (err instanceof RateLimitError) {
  //   res.status(429).send(err.message);
  // }
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

connectDB();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.BASE_URL_CLIENT,
    methods: ["GET", "POST"],
  },
});

let onlineUser = [];
/**
 * todo: tạo socket kết nối để chat realtime với client
 */
io.on("connect", (socket) => {
  logger.app.info(`User connected to with: ${socket.id}`);

  socket.on("join_room", async ({ idRoom, dataClient }) => {
    try {
      socket.join(idRoom);
      onlineUser.push({ ...dataClient, id: socket.id });
      socket.broadcast.emit("online_user", onlineUser);
      socket.emit("online_user", onlineUser);
      const listMessage = await discussionServices.getMessage(idRoom, 0);
      socket.emit("load_message", listMessage);
    } catch (error) {
      logger.discussion.error(error);
    }
  });

  socket.on("send_message", async ({ idRoom, idDoctor, message }) => {
    try {
      const newMessage = await discussionServices.setMessage(
        idRoom,
        idDoctor,
        message
      );
      socket.broadcast.emit("receive_message", newMessage);
      socket.emit("receive_message", newMessage);
    } catch (error) {
      logger.discussion.error(error);
    }
  });

  socket.on("load_more_messages", async ({ idRoom, skip }) => {
    const listMessage = await discussionServices.getMessage(idRoom, skip);
    socket.emit("load_message", listMessage);
  });

  socket.on("disconnect_socket", ({ idRoom }) => {
    onlineUser = onlineUser.filter((user) => user.id !== socket.id);
    socket.broadcast.to(idRoom).emit("update_users", onlineUser);
    logger.app.warning("User disconnected", socket.id);
  });
});

server.listen(process.env.PORT || 3000, () => {
  logger.app.info(`server listening on port: ${process.env.PORT}`);
});

module.exports = app;
