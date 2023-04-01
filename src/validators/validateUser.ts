import Joi, { ValidationError } from 'joi';
import { INewUser, IUser } from '../types/entities';

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

export const validateNewUser = (user: INewUser) =>
  newUserSchema.validate(user, { abortEarly: false });

export const validateUpdatedUser = (user: Partial<IUser>) =>
  updatedUserSchema.validate(user, { abortEarly: false });

export const mapErrors = (error: ValidationError) =>
  error.details.reduce(
    (errors, error) => ({
      ...errors,
      [error.path[0]]: error.message,
    }),
    {}
  );
