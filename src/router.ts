import express from "express";
const router = express.Router();
import memberController from "./controllers/member.controller";

//React

/** Member */
router.post("/member/signup", memberController.signup);
router.post("/member/login", memberController.login);
router.get("/member/verifyAuth", memberController.verifyAuth);

/** Product */

export default router;
