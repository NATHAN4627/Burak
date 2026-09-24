import express from "express";
import memberController from "./controllers/member.controller";

const router = express.Router();

router.get("/", memberController.goHome);

router.get("/login", memberController.goLogin);

router.get("/signup", memberController.goSignup);

export default router;
