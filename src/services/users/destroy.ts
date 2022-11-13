import * as UserDAO from '../../dao/users/userDAO';
import { CustomError } from '../../utils/response/custom-error/CustomError';

export const destroy = async (id: number): Promise<void> => {
  const user = await UserDAO.getById(id);

  if (!user) {
    throw new CustomError(404, 'General', 'Not Found', [`User with id:${id} doesn't exists.`]);
  }
  await UserDAO.destroy(user);
};
