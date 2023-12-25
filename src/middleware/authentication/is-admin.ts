import { Request, RequestHandler } from "express";
import { BizCardsError } from "../../error/biz-cards-error";
import { auth } from "../../service/auth-service";
import { User } from "../../database/model/user";

const extractToken = (req: Request) => {
  const authHeader = req.header("Authorization");

  if (
    authHeader &&
    authHeader.length > 7 &&
    authHeader.toLocaleLowerCase().startsWith("bearer ")
  )
    return authHeader.substring(7);

  throw new BizCardsError("token is missing in Authorization header", 400);
};

const isAdmin: RequestHandler = async (req, res, next) => {
  try {
    const token = extractToken(req);

    const { email } = auth.verifyJTW(token);

    const user = await User.findOne({ email });

    const isAdmin = user?.isAdmin;

    if (isAdmin) return next();

    return res.status(401).json({ message: "Accessible only by the Admin!" });
  } catch (error) {
    next(error);
  }
};

export { isAdmin, extractToken };
