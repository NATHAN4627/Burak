import express from "express";
const routerAdmin = express.Router();
import restaurantController from "./controllers/restaurant.controller";

/** Restaurant (Adminka) */
routerAdmin.get("/", restaurantController.goHome);

routerAdmin
  //.route("/same endpoint")
  .get("/login", restaurantController.goLogin)
  .post("/login", restaurantController.processLogin);

routerAdmin
  //.route("/same endpoint")
  .get("/signup", restaurantController.goSignup)
  .post("/signup", restaurantController.processSignup);

/** Product */
/** User */

export default routerAdmin;
