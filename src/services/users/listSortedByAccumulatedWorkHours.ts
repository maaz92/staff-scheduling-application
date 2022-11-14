import * as UserDAO from '../../dao/users/userDAO';
import { UserView } from '../../view/users/userView';

export const listSortedByAccumulatedWorkHours = async (
  startDate,
  endDate,
  sortOrder,
): Promise<UserView[]> => {
  return await UserDAO.listSortedByAccumulatedWorkHours(startDate, endDate, sortOrder);
};
