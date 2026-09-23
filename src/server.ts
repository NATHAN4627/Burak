import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();


mongoose
  .connect(process.env.MONGO_URL as string, {})
  .then((data) => {
    console.log("Success on db");
  })
  .catch((err) => {
    console.log("Error on connnecting to db", err);
  });
