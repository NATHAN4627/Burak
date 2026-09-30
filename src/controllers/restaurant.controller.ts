import { T } from "../libs/types/common";
import { Request, Response } from "express";
import MemberService from "../models/Member.service";
import { MemberInput, LoginInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";

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

restaurantController.processLogin = async (req: Request, res: Response) => {
  try {
    const input: LoginInput = req.body;

    const memberService = new MemberService();
    const result = await memberService.processLogin(input);

    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

restaurantController.goSignup = (req: Request, res: Response) => {
  try {
    res.send("Signup page");
  } catch (err) {
    console.log("Error, goSignup", err);
  }
};

restaurantController.processSignup = async (req: Request, res: Response) => {
  try {
    const newMember: MemberInput = req.body;
    newMember.memberType = MemberType.RESTAURANT;

    const memberService = new MemberService();
    const result = await memberService.processSignup(newMember);

    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

export default restaurantController;
