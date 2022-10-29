require("dotenv").config();
require("express-async-errors");

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const express = require("express");
const app = express();

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// db
const connectDB = require("./db/connect");

// routers
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

app.set('trust proxy', true);
app.use(rateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 100, 
  standardHeaders: true, 
  legacyHeaders: false
}));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());


// routes
app.use("/auth", authRouter);
app.use("/jobs", jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

