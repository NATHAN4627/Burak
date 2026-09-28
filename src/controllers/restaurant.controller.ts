import { T } from "../libs/types/common";
import { Request, Response } from "express";
import MemberService from "../models/Member.service";

const restaurantController: T = {};

restaurantController.goHome = (req: Request, res: Response) => {
  try {
    res.send("Home page");
  } catch (err) {
    console.log("Error, goHome", err);
  }
};

restaurantController.goLogin = (req: Request, res: Response) => {
  try {
    res.send("Login page");
  } catch (err) {
    console.log("Error, goLogin", err);
  }
};

restaurantController.processLogin = (req: Request, res: Response) => {
  try {
    res.send("processLogin page");
  } catch (err) {
    console.log("Error, processLogin", err);
  }
};

restaurantController.goSignup = (req: Request, res: Response) => {
  try {
    res.send("Signup page");
  } catch (err) {
    console.log("Error, goSignup", err);
  }
};

restaurantController.processSignup = (req: Request, res: Response) => {
  try {
    res.send("processSignup page");
  } catch (err) {
    console.log("Error, processSignup", err);
  }
};

export default restaurantController;
