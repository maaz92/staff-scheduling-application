import { Request, Response, NextFunction } from 'express';

import { CustomError } from 'utils/response/custom-error/CustomError';

import { RegisterDTO } from '../../dto/auth';
import * as AuthService from '../../services/auth';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const registerDTO: RegisterDTO = req.body;
  try {
    await AuthService.register(registerDTO);
    res.customSuccess(200, 'User successfully created.');
  } catch (customError) {
    if (customError.HttpStatusCode === undefined) {
      customError = new CustomError(500, 'Raw', `User '${registerDTO.email}' can't be created`, null, customError);
    }
    return next(customError);
  }
};
