import { NextFunction } from 'express';

import * as ScheduleDAO from '../../dao/schedules/scheduleDAO';
import { CustomError } from '../../utils/response/custom-error/CustomError';

export const destroy = async (id: number): Promise<void> => {
  const schedule = await ScheduleDAO.getById(id);
  console.log(schedule);
  if (!schedule) {
    throw new CustomError(404, 'General', 'Not Found', [`Schedule with id:${id} doesn't exists.`]);
  }
  await ScheduleDAO.destroy(schedule);
};
