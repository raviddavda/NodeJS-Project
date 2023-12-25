import { RequestHandler } from "express";
import { auth } from "../../service/auth-service";
import { User } from "../../database/model/user";
import { extractToken } from "./is-admin";
import { BizCardsError } from "../../error/biz-cards-error";

const isBusiness: RequestHandler = async (req, res, next) => {
  try {
    const token = extractToken(req);

    const { email } = auth.verifyJTW(token);

    const user = await User.findOne({ email });

    if (!user) throw new BizCardsError("User does not exist!", 401);

    req.user = user;

    const isBusiness = user?.isBusiness;

    if (isBusiness) return next();

    throw new BizCardsError("Only a business account can do that!", 401);
  } catch (error) {
    next(error);
  }
};

export { isBusiness };
