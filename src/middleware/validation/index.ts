import { businessSchema } from "../../joi/business.joi";
import { cardSchema } from "../../joi/card.joi";
import { loginSchema } from "../../joi/login.joi";
import { registerSchema } from "../../joi/register.joi";
import { validateSchema } from "./validate-schema";

export const validateRegistration = validateSchema(registerSchema);
export const validateLogin = validateSchema(loginSchema);
export const validateBusiness = validateSchema(businessSchema);
export const validateCard = validateSchema(cardSchema);
