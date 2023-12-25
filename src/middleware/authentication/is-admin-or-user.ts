import { RequestHandler } from "express";
import { auth } from "../../service/auth-service";
import { User } from "../../database/model/user";
import { extractToken } from "./is-admin";
import { BizCardsError } from "../../error/biz-cards-error";

const isAdminOrUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = extractToken(req);
    const { email } = auth.verifyJTW(token);

    const user = await User.findOne({ email });

    if (!user) throw new BizCardsError("User does not exist!", 401);

    if (id == user.id) return next();

    if (user.isAdmin) return next();

    res.status(401).json({ message: "Accessible only by the user or Admin!" });
  } catch (error) {
    next(error);
  }
};

export { isAdminOrUser };
