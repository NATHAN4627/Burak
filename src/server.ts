import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app";

mongoose
  .connect(process.env.MONGO_URL as string)
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


  // node js ni 22.0 versionga utkazamiz birinchi 
  // mongoose schema yaratishga ham yani table lar yaratishga ham yordam beradi