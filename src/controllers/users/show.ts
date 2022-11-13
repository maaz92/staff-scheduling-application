import { Request, Response, NextFunction } from 'express';

import { CustomError } from 'utils/response/custom-error/CustomError';

import * as UserService from '../../services/users';

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);

  try {
    const user = await UserService.show(id);
    res.customSuccess(200, 'User found', user);
  } catch (customError) {
    if (customError.HttpStatusCode === undefined) {
      customError = new CustomError(400, 'Raw', 'Error', null, customError);
    }
    return next(customError);
  }
};
