import * as UserDAO from '../../dao/users/userDAO';
import { User } from '../../orm/entities/users/User';

export const list = async (): Promise<User[]> => {
  return await UserDAO.list();
};
