import { NextFunction } from 'express';

import * as AuthDAO from '../../dao/auth/authDAO';
import { ChangePasswordDTO } from '../../dto/auth/changePasswordDTO';
import { JwtPayload } from '../../types/JwtPayload';
import { CustomError } from '../../utils/response/custom-error/CustomError';

export const changePassword = async (changePasswordDTO: ChangePasswordDTO, jwtPayload: JwtPayload): Promise<void> => {
  const user = await AuthDAO.getById(jwtPayload.id);
  if (!user) {
    throw new CustomError(404, 'General', 'Not Found', [`User ${name} not found.`]);
  }

  if (!user.checkIfPasswordMatch(changePasswordDTO.password)) {
    throw new CustomError(400, 'General', 'Not Found', ['Incorrect password']);
  }

  user.password = changePasswordDTO.passwordNew;
  user.hashPassword();
  await AuthDAO.createOrUpdate(user);
};
