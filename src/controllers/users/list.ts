import { Request, Response, NextFunction } from 'express';

import { CustomError } from 'utils/response/custom-error/CustomError';

import { UserQueryDTO } from '../../dto/users/userQueryDTO';
import * as UserService from '../../services/users';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserService.list();
    res.customSuccess(200, 'List of users.', users);
  } catch (customError) {
    if (customError.HttpStatusCode === undefined) {
      customError = new CustomError(400, 'Raw', `Can't retrieve list of users.`, null, customError);
    }
    return next(customError);
  }
};
