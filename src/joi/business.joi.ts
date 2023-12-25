import Joi from "joi";
import { IBusiness } from "../@types/user";

const businessSchema = Joi.object<IBusiness>({
  isBusiness: Joi.boolean().required(),
});

export { businessSchema };
