import express from "express";
import { connect } from "./connection.js";
import urlRoute from "./routes/url.js";
import dotenv from "dotenv";

const app = express();

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

// Connecting to MongoDB
connect(process.env.MONGO_URL);

app.use(express.json());
// all Routes
app.use("/", urlRoute);

// Starting the server
app.listen(process.env.PORT || 8001, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
