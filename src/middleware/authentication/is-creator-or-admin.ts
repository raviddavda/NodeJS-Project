import { RequestHandler } from "express";
import { extractToken } from "./is-admin";
import { auth } from "../../service/auth-service";
import { User } from "../../database/model/user";
import { BizCardsError } from "../../error/biz-cards-error";

const isCreatorOrAdmin: RequestHandler = async (req, res, next) => {
  try {
    const token = extractToken(req);

    const { email } = auth.verifyJTW(token);

    const user = await User.findOne({ email });

    const id = user?._id;

    if (!user) throw new BizCardsError("User does not exist!", 401);

    if (id == user.id) return next();

    if (user.isAdmin) return next();

    res.status(401).json({ message: "Accessible only by the user or Admin!" });

    next();
  } catch (error) {
    next(error);
  }
};

export { isCreatorOrAdmin };
