import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL as string, {})
  .then((data) => {
    console.log("Success on db");
    const PORT = process.env.PORT ?? 3003;
    app.listen(PORT, function () {
      console.log(`Server runnig on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error on connnecting to db", err);
  });
