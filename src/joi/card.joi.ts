import Joi from "joi";
import { ICard } from "../@types/cards";
import { IAddress, IImage } from "../@types/user";
import { phoneRegex } from "./patterns";

const cardSchema = Joi.object<ICard>({
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
  title: Joi.string().min(2).max(256).required(),
  subtitle: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  phone: Joi.string().min(9).max(15).pattern(phoneRegex).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(5)
    .max(255)
    .required(),
  web: Joi.string().allow(""),
});

export { cardSchema };
