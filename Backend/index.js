import express from "express";
import { connect } from "./connection.js";
import urlRoute from "./routes/url.js";

const app = express();
const PORT = 8001;
const MONGO_URL =
  "mongodb+srv://omprarox:ompra@cluster0.9mzjo1v.mongodb.net/?retryWrites=true&w=majority";

// Connecting to MongoDB
connect(MONGO_URL);

app.use(express.json());
// all Routes
app.use("/", urlRoute);

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
