import { Router } from "express";
import { User } from "../database/model/user";
import {
  validateBusiness,
  validateLogin,
  validateRegistration,
} from "../middleware/validation";
import { ILogin, IUser } from "../@types/user";
import { createUser, validateUser } from "../service/user-service";
import { isAdmin } from "../middleware/authentication/is-admin";
import { isAdminOrUser } from "../middleware/authentication/is-admin-or-user";
import { isUser } from "../middleware/authentication/is-user";
import { auth } from "../service/auth-service";

const router = Router();

router.get("/", isAdmin, async (req, res, next) => {
  try {
    const allUsers = await User.find();

    res.json({ allUsers });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", isAdminOrUser, async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = (await User.findById(id).lean()) as IUser;

    const { password, ...rest } = user;

    return res.json({ rest });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", isUser, validateRegistration, async (req, res, next) => {
  req.body.password = await auth.hashPassword(req.body.password);

  const { password, ...savedUser } = await User.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  ).lean();

  res.json(savedUser);
});

router.patch("/:id", isUser, validateBusiness, async (req, res, next) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );

  res.json(updatedUser);
});

router.delete("/:id", isAdminOrUser, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findOneAndDelete({ _id: id }).lean();

    res.json(deletedUser);
  } catch (error) {
    next(error);
  }
});

router.post("/", validateRegistration, async (req, res, next) => {
  try {
    const saved = await createUser(req.body as IUser);

    res.status(201).json({ message: "User Created!", user: saved });
  } catch (error) {
    next(error);
  }
});

router.post("/login", validateLogin, async (req, res, next) => {
  try {
    const { email, password } = req.body as ILogin;

    const jwt = await validateUser(email, password);

    res.json(jwt);
  } catch (error) {
    next(error);
  }
});

export { router as userRouter };
