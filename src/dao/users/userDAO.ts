import { getManager, getRepository } from 'typeorm';

import { User } from '../../orm/entities/users/User';
import { UserView } from '../../view/users/userView';

const userRepository = () => getRepository(User);

export const getById = async (id: number): Promise<User> => {
  return await userRepository().findOne({ where: { id } });
};

export const getByEmail = async (email: string): Promise<User> => {
  return await userRepository().findOne({ where: { email } });
};

export const destroy = async (user: User): Promise<void> => {
  await userRepository().softDelete(user.id);
};

export const list = async (): Promise<User[]> => {
  return await userRepository().find({
    select: ['id', 'username', 'name', 'email', 'role', 'language', 'created_at', 'updated_at', 'deleted_at'],
  });
};

export const listSortedByAccumulatedWorkHours = async (
  startDate,
  endDate,
  sortOrder,
): Promise<UserView[]> => {
  const retValue = await getManager()
    .query(`SELECT a.id, a.username, a.name, a.email , SUM(b.length) AS total_accumulated_work_hours
FROM users a INNER JOIN schedules b
ON a.id=b.staff_id
where b.date between '${startDate}' AND '${endDate}'
AND a.deleted_at IS NULL
AND b.deleted_at IS NULL
GROUP BY a.id ORDER BY total_accumulated_work_hours ${sortOrder}`);
  retValue.forEach(
    (retValue) => (retValue.total_accumulated_work_hours = parseInt(retValue.total_accumulated_work_hours)),
  );
  return retValue;
};

export const show = async (id: number): Promise<User> => {
  return await userRepository().findOne({ where: { id } });
};

export const update = async (user: User): Promise<void> => {
  await userRepository().save(user);
};
