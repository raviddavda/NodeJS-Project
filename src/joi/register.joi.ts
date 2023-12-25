import Joi from "joi";
import { IAddress, IImage, IName, IUser } from "../@types/user";
import { passwordRegex, phoneRegex } from "./patterns";

const registerSchema = Joi.object<IUser>({
  name: Joi.object<IName>({
    first: Joi.string().min(2).max(100).required(),
    middle: Joi.string().allow(""),
    last: Joi.string().min(2).max(100).required(),
  }).required(),
  address: Joi.object<IAddress>({
    city: Joi.string().min(2).max(50).required(),
    houseNumber: Joi.number().min(1).max(99999).required(),
    country: Joi.string().min(2).max(50).required(),
    state: Joi.string().max(50).allow(""),
    street: Joi.string().min(2).max(50).required(),
    zip: Joi.string().max(30).allow(""),
  }).required(),
  image: Joi.object<IImage>({
    url: Joi.string().min(12).max(200).required(),
    alt: Joi.string().min(2).max(200).required(),
  }),
  phone: Joi.string()
    .min(9)
    .max(15)
    .pattern(phoneRegex)
    .messages({
      "string.empty": "This field is required",
      "string.min": "Must be a valid Israeli phone number",
      "string.pattern.base": "Must be a valid Israeli phone number",
    })
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(5)
    .max(255)
    .required(),
  password: Joi.string()
    .pattern(passwordRegex)
    .min(9)
    .max(40)
    .messages({
      "string.pattern.base":
        "Password must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-",
      "string.empty": "This field is required",
    })
    .required(),
  isBusiness: Joi.boolean().required(),
});

export { registerSchema };
