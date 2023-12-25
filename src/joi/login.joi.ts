import Joi from "joi";
import { ILogin } from "../@types/user";
import { passwordRegex } from "./patterns";

const loginSchema = Joi.object<ILogin>({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(passwordRegex).required(),
});

export { loginSchema };
