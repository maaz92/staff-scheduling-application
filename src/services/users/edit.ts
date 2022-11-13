import { NextFunction } from 'express';

import * as UserDAO from '../../dao/users/userDAO';
import { EditUserDTO } from '../../dto/users/editUserDTO';
import { CustomError } from '../../utils/response/custom-error/CustomError';

export const edit = async (id: number, editUserDTO: EditUserDTO): Promise<void> => {
  const user = await UserDAO.getById(id);

  if (!user) {
    throw new CustomError(404, 'General', `User with id:${id} not found.`, ['User not found.']);
  }

  user.username = editUserDTO.username;
  user.name = editUserDTO.name;

  await UserDAO.update(user);
};
