import express from "express";
const routerAdmin = express.Router();
import restaurantController from "./controllers/restaurant.controller";

/** Restaurant (Adminka) */
routerAdmin.get("/", restaurantController.goHome);

routerAdmin
  .get("/signup", restaurantController.getSignup)
  .post("/signup", restaurantController.processSignup);

routerAdmin
  .get("/login", restaurantController.getLogin)
  .post("/login", restaurantController.processLogin);

routerAdmin
  .get("/logout", restaurantController.logout)
  .get("/check-me", restaurantController.checkAuthSession);

/** Product */
/** User */

export default routerAdmin;
