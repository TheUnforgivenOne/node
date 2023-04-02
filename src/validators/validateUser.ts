import Joi, { ValidationError } from 'joi';

const mapJoiErrors = (error: ValidationError) =>
  error.details.reduce(
    (errors, error) => ({
      ...errors,
      [error.path[0]]: error.message,
    }),
    {}
  );

const passwordPattern = /(?=.*[A-Za-z])(?=.*[0-9])/;

const newUserSchema = Joi.object().keys({
  login: Joi.string().alphanum().min(3).max(10).required(),
  password: Joi.string().regex(passwordPattern).required(),
  age: Joi.number().min(4).max(130).required(),
});

const updatedUserSchema = Joi.object().keys({
  id: Joi.string(),
  login: Joi.string().alphanum().min(3).max(10),
  password: Joi.string().regex(passwordPattern),
  age: Joi.number().min(4).max(130),
  isDeleted: Joi.boolean(),
});

export const validateNewUser = (req, res, next) => {
  const userDTO = req.body;

  const { error } = newUserSchema.validate(userDTO, { abortEarly: false });
  if (error?.isJoi)
    return res.status(400).json({ message: mapJoiErrors(error) });

  next();
};

export const validateUpdatedUser = (req, res, next) => {
  const userDTO = req.body;

  const { error } = updatedUserSchema.validate(userDTO, { abortEarly: false });
  if (error?.isJoi)
    return res.status(400).json({ message: mapJoiErrors(error) });

  next();
};
