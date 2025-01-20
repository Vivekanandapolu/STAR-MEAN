import mongoose from "mongoose";

export const connectDB = async () => {
  const url = process.env.URL;
  await mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Mongodb connected...");
    })
    .catch((err) => {
      console.log(err.message || "Error While connnecting to Database");
    });
};
