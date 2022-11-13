import * as UserDAO from '../../dao/users/userDAO';
import { User } from '../../orm/entities/users/User';
import { CustomError } from '../../utils/response/custom-error/CustomError';

export const show = async (id: number): Promise<User> => {
  const user = await UserDAO.show(id);
  if (!user) {
    throw new CustomError(404, 'General', `User with id:${id} not found.`, ['User not found.']);
  }
  return user;
};
