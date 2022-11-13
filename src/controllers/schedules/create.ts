import { Request, Response, NextFunction } from 'express';

import { CustomError } from 'utils/response/custom-error/CustomError';

import { ScheduleDTO } from '../../dto/schedules/scheduleDTO';
import * as ScheduleService from '../../services/schedules';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const scheduleDTO: ScheduleDTO = req.body;

  try {
    await ScheduleService.create(scheduleDTO);
    res.customSuccess(200, 'Schedule successfully created.');
  } catch (customError) {
    if (customError.HttpStatusCode === undefined) {
      customError = new CustomError(500, 'Raw', `Schedule can't be created`, null, customError);
    }
    return next(customError);
  }
};
