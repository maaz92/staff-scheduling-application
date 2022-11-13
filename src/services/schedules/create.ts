import { NextFunction } from 'express';

import * as ScheduleDAO from '../../dao/schedules/scheduleDAO';
import * as UserDAO from '../../dao/users/userDAO';
import { ScheduleDTO } from '../../dto/schedules/scheduleDTO';
import { Schedule } from '../../orm/entities/schedules/Schedule';
import { CustomError } from '../../utils/response/custom-error/CustomError';

export const create = async (scheduleDTO: ScheduleDTO): Promise<void> => {
  const user = await UserDAO.getByEmail(scheduleDTO.email);

  if (!user) {
    throw new CustomError(404, 'Validation', 'User does not exist', [
      `User with Email '${scheduleDTO.email}' does not exist`,
    ]);
  }
  const schedule = new Schedule();
  schedule.date = scheduleDTO.date;
  schedule.staff = user;
  schedule.length = scheduleDTO.length;
  await ScheduleDAO.createOrUpdate(schedule);
};
