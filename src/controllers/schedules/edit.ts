import { Request, Response, NextFunction } from 'express';

import { CustomError } from 'utils/response/custom-error/CustomError';

import { ScheduleDTO } from '../../dto/schedules/scheduleDTO';
import * as ScheduleService from '../../services/schedules';

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  const scheduleDTO: ScheduleDTO = req.body;

  try {
    await ScheduleService.edit(id, scheduleDTO);
    res.customSuccess(200, 'Schedule successfully saved.');
  } catch (customError) {
    if (customError.HttpStatusCode === undefined) {
      customError = new CustomError(500, 'Raw', `Schedule can't be saved.`, null, customError);
    }
    return next(customError);
  }
};
