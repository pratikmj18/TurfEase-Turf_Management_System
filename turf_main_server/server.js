const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const config = require("./config");
const utils = require("./utils");

const app = express();
app.use(cors());
app.use(morgan("combined"));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

const openRoutes = [
  "/owner/signup",
  "/owner/signin",
  "/player/signup",
  "/player/signin"
];

// Middleware to check if token is required
app.use((request, response, next) => {
  if (openRoutes.includes(request.url)) {
    next();
  } else {
    const authHeader = request.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return response.status(401).send(utils.createError("Missing token"));
    }

    try {
      const payload = jwt.verify(token, config.secret);
      request.user = payload;
      next();
    } catch (ex) {
      return response.status(403).send(utils.createError("Invalid token"));
    }
  }
});

// Add the routes
const userRouter = require("./routes/owner");
const playerRouter = require("./routes/player");
const turfRoot = require("./routes/turflist");
const turf_bookingRoot = require("./routes/turf_booking");
const payment_historyRoot = require("./routes/paymnet_history");

app.use("/owner", userRouter);
app.use("/player", playerRouter);
app.use("/turflist", turfRoot);
app.use("/turf_booking", turf_bookingRoot);
app.use("/payment_history", payment_historyRoot);

// Start the server
app.listen(config.serverport, () => {
  console.log(`server started on port ${config.serverport}`);
});
