import { Request, Response, NextFunction } from 'express';

import { CustomError } from 'utils/response/custom-error/CustomError';

import { EditUserDTO } from '../../dto/users/editUserDTO';
import * as UserService from '../../services/users';

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  const editUserDTO: EditUserDTO = req.body;

  try {
    await UserService.edit(id, editUserDTO);
    res.customSuccess(200, 'User successfully saved.');
  } catch (err) {
    const customError = new CustomError(409, 'Raw', `User can't be saved.`, null, err);
    return next(customError);
  }
};
