import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "./connection.js";
import urlRoute from "./routes/url.js";

const app = express();

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

// Middlewares
const allowedOrigins = [
  "http://localhost:3000",
  "https://shorturl--frontend.vercel.app",
];
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

// Connecting to MongoDB
connect(process.env.MONGO_URL);

app.use(express.json());
// all Routes
app.use("/", urlRoute);

// Starting the server
app.listen(process.env.PORT || 8001, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
