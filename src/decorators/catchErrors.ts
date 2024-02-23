import { Request, Response, NextFunction } from 'express';

type CatchErrorsType = (
  target: any,
  propertyKey: string | Symbol,
  descriptor: PropertyDescriptor
) => void;

// catchErrorx decorator handles errors inside RequestHandlers methods
const catchErrors: CatchErrorsType = (target, propertyKey, descriptor) => {
  const method = descriptor.value;

  descriptor.value = function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    method.call(target, req, res, next).catch(next);
  };
};

export default catchErrors;
