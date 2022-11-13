import { NextFunction } from 'express';

import * as ScheduleDAO from '../../dao/schedules/scheduleDAO';
import { ScheduleDTO } from '../../dto/schedules/scheduleDTO';
import { CustomError } from '../../utils/response/custom-error/CustomError';

export const edit = async (id: number, scheduleDTO: ScheduleDTO): Promise<void> => {
  const schedule = await ScheduleDAO.getById(id);

  if (!schedule) {
    throw new CustomError(404, 'General', `Schedule with id:${id} not found.`, ['Schedule not found.']);
  }
  schedule.length = scheduleDTO.length;
  await ScheduleDAO.createOrUpdate(schedule);
};
