import { ValidationError } from 'joi';

export const mapJoiErrors = (error: ValidationError) =>
  error.details.reduce(
    (errors, error) => ({
      ...errors,
      [error.path[0]]: error.message,
    }),
    {}
  );
