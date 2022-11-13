import { NextFunction } from 'express';

import * as AuthDAO from '../../dao/auth/authDAO';
import { RegisterDTO } from '../../dto/auth/registerDTO';
import { User } from '../../orm/entities/users/User';
import { CustomError } from '../../utils/response/custom-error/CustomError';

export const register = async (registerDTO: RegisterDTO): Promise<void> => {
  const user = await AuthDAO.getByEmail(registerDTO.email);
  if (user) {
    throw new CustomError(400, 'General', 'User already exists', [`Email '${user.email}' already exists`]);
  }
  const newUser = new User();
  newUser.email = registerDTO.email;
  newUser.password = registerDTO.password;
  newUser.hashPassword();
  await AuthDAO.createOrUpdate(newUser);
};
