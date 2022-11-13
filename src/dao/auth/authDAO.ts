import { getRepository } from 'typeorm';

import { User } from '../../orm/entities/users/User';

const userRepository = () => getRepository(User);

export const createOrUpdate = async (user: User): Promise<void> => {
  await userRepository().save(user);
};

export const getById = async (id: number): Promise<User> => {
  return await userRepository().findOne({ where: { id } });
};

export const getByEmail = async (email: string): Promise<User> => {
  return await userRepository().findOne({ where: { email } });
};
