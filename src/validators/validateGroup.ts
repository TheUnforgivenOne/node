import Joi from 'joi';
import { mapJoiErrors } from '../utils';
import { Permission } from '../types/entities';

const newGroupSchema = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(20).required(),
  permissions: Joi.array().items(Joi.string()),
});

const updateGroupSchema = Joi.object().keys({
  id: Joi.string(),
  name: Joi.string().alphanum().min(3).max(20),
  permissions: Joi.array().items(Joi.string()),
});

export const validateNewGroup = (req, res, next) => {
  const groupDTO = req.body;

  const { error } = newGroupSchema.validate(groupDTO, { abortEarly: false });
  if (error?.isJoi)
    return res.status(400).json({ message: mapJoiErrors(error) });

  next();
};

export const validateUpdatedGroup = (req, res, next) => {
  const groupDTO = req.body;

  const { error } = updateGroupSchema.validate(groupDTO, { abortEarly: false });
  if (error?.isJoi)
    return res.status(400).json({ message: mapJoiErrors(error) });

  next();
};
