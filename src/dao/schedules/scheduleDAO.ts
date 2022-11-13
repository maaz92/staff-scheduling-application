import { getRepository } from 'typeorm';

import { Schedule } from '../../orm/entities/schedules/Schedule';

const scheduleRepository = () => getRepository(Schedule);

export const createOrUpdate = async (schedule: Schedule): Promise<void> => {
  await scheduleRepository().save(schedule);
};

export const getById = async (id: number): Promise<Schedule> => {
  return await scheduleRepository().findOne({ where: { id } });
};

export const destroy = async (schedule: Schedule): Promise<void> => {
  await scheduleRepository().softDelete(schedule.id);
};

export const list = async (): Promise<Schedule[]> => {
  return await scheduleRepository().find({
    select: ['id', 'staffId', 'date', 'length', 'created_at', 'updated_at'],
  });
};
