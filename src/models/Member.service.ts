import { MemberType } from "../libs/enums/member.enum";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { Member, MemberInput, LoginInput } from "../libs/types/member";
import MemberModel from "../schema/Member.model";
import * as bcrypt from "bcryptjs";

class MemberService {
  private readonly memberModel;

  constructor() {
    this.memberModel = MemberModel;
  }

  /** SPA (Member user)*/
  public async signup(input: MemberInput): Promise<Member> {
    //hashing pswd
    const salt = await bcrypt.genSalt();
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

    try {
      const result = await this.memberModel.create(input);
      result.memberPassword = "";
      return result.toJSON() as Member;
    } catch (err) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE);
    }
  }

  public async login(input: LoginInput): Promise<Member> {
    // TODO: Consider member status later
    const member = await this.memberModel
      .findOne(
        { memberNick: input.memberNick },
        //login qilganda memberNick va memberPasswordni 1 orqali olib kelish uchun yozdik
        { memberNick: 1, memberPassword: 1 }
      )
      .exec();

    //2 ta errorni bitta qilsak xavfsizlik uchun yaxshi buladi!!!
    if (!member || !member.memberPassword) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PSWD_NICK);
    }

    const isMatch = await bcrypt.compare(
      input.memberPassword,
      member.memberPassword
    );
    if (!isMatch) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PSWD_NICK);
    }

    // lean() orqali db'dan olgan ma'lumotimizni ozgartira olamiz
    const result = await this.memberModel.findById(member._id).lean().exec();
    return result as Member;
  }

  /** SSR (Admin)*/
  public async processSignup(input: MemberInput): Promise<Member> {
    const exist = await this.memberModel
      .findOne({ memberType: MemberType.RESTAURANT })
      .exec();

    if (exist) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }

    //hashing pswd
    const salt = await bcrypt.genSalt();
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

    try {
      const result = await this.memberModel.create(input);
      result.memberPassword = "";
      return result;
    } catch (err) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  public async processLogin(input: LoginInput): Promise<Member> {
    const member = await this.memberModel
      .findOne(
        { memberNick: input.memberNick },
        //login qilganda memberNick va memberPasswordni 1 orqali olib kelish uchun yozdik
        { memberNick: 1, memberPassword: 1 }
      )
      .exec();

    //2 ta errorni bitta qilsak xavfsizlik uchun yaxshi buladi!!!
    if (!member || !member.memberPassword) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PSWD_NICK);
    }

    const isMatch = await bcrypt.compare(
      input.memberPassword,
      member.memberPassword
    );
    if (!isMatch) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PSWD_NICK);
    }

    const result = await this.memberModel.findById(member._id).exec();
    return result as Member;
  }
}
export default MemberService;
