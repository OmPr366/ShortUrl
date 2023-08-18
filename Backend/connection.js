import mongoose from "mongoose";

export async function connect(url) {
  //   return mongoose.connect(url, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   });

  console.log("Connecting to mongoDB...");
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected Successfully ! "))
    .catch((err) => console.log("Error while connecting to mongoDB", err));
}

// export { connect };
