import express from "express";
const routerAdmin = express.Router();
import restaurantController from "./controllers/restaurant.controller";
import productController from "./controllers/product.controller";
import makeUploader from "./libs/utils/uploader";

/** Restaurant (Adminka) */
routerAdmin.get("/", restaurantController.goHome);

routerAdmin
  .get("/signup", restaurantController.getSignup)
  .post(
    "/signup",
    makeUploader("members").single("memberImage"),
    //makeUploader da next() quyish shart emasmi? file upload bulgandan keyin keyingisiga uzi utib ketadimi?
    restaurantController.processSignup
  );

routerAdmin
  .get("/login", restaurantController.getLogin)
  .post("/login", restaurantController.processLogin);

routerAdmin
  .get("/logout", restaurantController.logout)
  .get("/check-me", restaurantController.checkAuthSession);

/** Product */
routerAdmin
  .get(
    "/product/all",
    restaurantController.verifyRestaurant,
    productController.getAllProducts
  )
  .post(
    "/product/create",
    restaurantController.verifyRestaurant,
    makeUploader("products").array("productImages", 5),
    productController.createNewProduct
  )
  .post(
    "/product/:id",
    restaurantController.verifyRestaurant,
    productController.updateChosenProduct
  );

/** User */

export default routerAdmin;
