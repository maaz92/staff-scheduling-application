import { Request, Response, NextFunction } from 'express';

import { CustomError } from 'utils/response/custom-error/CustomError';

import { LoginDTO } from '../../dto/auth';
import * as UserService from '../../services/auth';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const loginDTO: LoginDTO = req.body;

  try {
    const token = await UserService.login(loginDTO);
    res.customSuccess(200, 'Token successfully created.', `Bearer ${token}`);
  } catch (customError) {
    if (customError.HttpStatusCode === undefined) {
      customError = new CustomError(500, 'Raw', "Token can't be created", null, customError);
    }
    return next(customError);
  }
};
