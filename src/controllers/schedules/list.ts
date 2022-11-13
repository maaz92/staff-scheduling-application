import { Request, Response, NextFunction } from 'express';

import { CustomError } from 'utils/response/custom-error/CustomError';

import * as ScheduleService from '../../services/schedules';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schedules = await ScheduleService.list();
    res.customSuccess(200, 'List of schedules.', schedules);
  } catch (customError) {
    if (customError.HttpStatusCode === undefined) {
      customError = new CustomError(500, 'Raw', `Can't retrieve list of schedules.`, null, customError);
    }
    return next(customError);
  }
};
