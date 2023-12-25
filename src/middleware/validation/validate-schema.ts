import { RequestHandler } from "express";
import { validationErrorHandler } from "../../joi/validation-error-handler";
import { ObjectSchema } from "joi";

type ValidateSchema = (schema: ObjectSchema) => RequestHandler;

const validateSchema: ValidateSchema = (schema) => (req, res, next) => {
  const error = validationErrorHandler(schema, req.body);

  if (!error) return next();

  res.status(400).json({ error });
};

export { validateSchema };
