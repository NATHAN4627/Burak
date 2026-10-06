import { T } from "../libs/types/common";
import { Request, Response } from "express";
import MemberService from "../models/Member.service";
import { MemberInput, LoginInput, AdminRequest } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import Errors, { Message } from "../libs/Errors";

const memberService = new MemberService(); //STATIC to call in every method
const restaurantController: T = {};

restaurantController.goHome = (req: Request, res: Response) => {
  try {
    res.render("home");
  } catch (err) {
    console.log("Error, goHome", err);
    res.redirect("/admin");
  }
};

restaurantController.getSignup = (req: Request, res: Response) => {
  try {
    res.render("signup");
  } catch (err) {
    console.log("Error, goSignup", err);
    res.redirect("/admin");
  }
};

restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    res.render("login");
  } catch (err) {
    console.log("Error, goLogin", err);
    res.redirect("/admin");
  }
};

restaurantController.processSignup = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    const newMember: MemberInput = req.body;
    newMember.memberType = MemberType.RESTAURANT;

    const result = await memberService.processSignup(newMember);
    // SESSIONS AUTH
    req.session.member = result;
    req.session.save(function () {
      res.send(result);
    });
  } catch (err) {
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert("${message}"); window.location.replace('admin/signup') </script>`
    );
    res.send(err);
  }
};

restaurantController.processLogin = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    const input: LoginInput = req.body,
      result = await memberService.processLogin(input);
    // SESSIONS AUTH
    req.session.member = result;
    req.session.save(function () {
      res.send(result);
    });
  } catch (err) {
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert("${message}"); window.location.replace('admin/login') </script>`
    );
    res.send(err);
  }
};

restaurantController.checkAuthSession = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("checkAuthSession");
    if (req.session?.member) res.send(`Hi, ${req.session.member.memberNick}`);
    else res.send(Message.NOT_AUTH);
  } catch (err) {
    console.log("Error, checkAuthSession", err);
    res.send(err);
  }
};

restaurantController.logout = async (req: AdminRequest, res: Response) => {
  try {
    req.session.destroy(function () {
      res.redirect("/admin");
    });
  } catch (err) {
    console.log("Error, checkAuthSession", err);
    res.redirect("/admin");
  }
};

export default restaurantController;
