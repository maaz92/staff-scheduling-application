import { Request, Response, NextFunction } from 'express';

import { CustomError } from 'utils/response/custom-error/CustomError';

import { ChangePasswordDTO } from '../../dto/auth';
import * as UserService from '../../services/auth';

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  const changePasswordDTO: ChangePasswordDTO = req.body;
  const jwtPayload = req.jwtPayload;
  try {
    const returnValue = await UserService.changePassword(changePasswordDTO, jwtPayload);
    res.customSuccess(200, 'Password successfully changed.');
  } catch (customError) {
    if (customError.HttpStatusCode === undefined) {
      customError = new CustomError(500, 'Raw', 'Error', null, customError);
    }
    return next(customError);
  }
};
